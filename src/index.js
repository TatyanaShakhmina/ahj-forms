import './style.css';

const initPopover = () => {
    const db = new WeakMap;

    const initElement = (element) => {
        element.addEventListener('click', () => togglePopover(element))
    }

    const togglePopover = element => {
        if (db.has(element)) {
            closePopover(element);
            return;
        }

        openPopover(element);
    }

    const openPopover = element => {
        const popover = createPopover(element);

        document.body.append(popover);

        Object.assign(
            popover.style,
            getPopoverStyle(element, popover)
        )

        db.set(element, popover);

        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
        }, 0);
    }

    const getPopoverStyle = (element, popover) => {
        const rect = element.getBoundingClientRect();
        const popoverRect = popover.getBoundingClientRect();

        const { pageXOffset, pageYOffset } = window;

        const arrowHeight = 8; // Высота стрелки

        const offset = {
            left: pageXOffset + rect.left + rect.width / 2 - popoverRect.width / 2,
            top: pageYOffset + rect.top - popoverRect.height
        }

        const style = {
            left: `${offset.left}px`,
            top: `${offset.top}px`
        }

        return style;
    }

    const createPopover = element => {

        const title = element.dataset.popoverTitle
        const content = element.dataset.popoverContent;

        const container = createElement('div', { className: 'popover' },
            createElement('div', { className: 'popover__title' }, title),
            createElement('div', { className: 'popover__body'}, content)
        )

        return container;
    }

    const closePopover = element => {
        const popover = db.get(element);

        popover.remove();

        db.delete(element);

        document.removeEventListener('click', handleOutsideClick);
    }

    const elements = [...document.querySelectorAll('[data-popover-content]')];

    for (const element of elements) {
        initElement(element)
    }
}

const createElement = (tagName, attrs, ...children) => {
    const element = Object.assign(
        document.createElement(tagName),
        attrs
    );

    element.append(...children);

    return element;
}

const handleOutsideClick = (event) => {
    const elements = [...document.querySelectorAll('[data-popover-content]')];

    for (const element of elements) {
        if (db.has(element)) {
            const popover = db.get(element);
            if (!popover.contains(event.target) && !element.contains(event.target)) {
                closePopover(element);
            }
        }
    }
}


initPopover();




