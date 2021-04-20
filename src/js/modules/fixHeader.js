const fixHeader = (sel) => {
    const selector = document.querySelector(sel);
    const selectorHeight = selector.offsetHeight;
    const wrap = document.createElement('div');

    wrap.classList.add('page_header_wrap');
    wrap.style.height = `${selectorHeight}px`;
    wrap.append(selector);
    document.querySelector('body').insertAdjacentElement( 'afterbegin', wrap)

    window.addEventListener('scroll',  () => {
        selector.classList.toggle('fix-header', window.scrollY > 0)
    })
}

export default fixHeader;