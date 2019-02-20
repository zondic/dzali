window.addEventListener('DOMContentLoaded', () => {
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        open = document.querySelector('#cart'),
        close = document.querySelector('.cart__close'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm  = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');

    function openCart(){
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    open.addEventListener('click', openCart);
    close.addEventListener('click', closeCart);

    goodsBtn.forEach(function(btn, i){
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');

            trigger.remove();

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';

            showConfirm();
            calcGoods(1);

            item.appendChild(removeBtn);
            cartWrapper.appendChild(item);
            if (empty){
                empty.remove();
            }
            calcTotal();
            removeFromCart();
        });
    });

    titles.forEach(function (item) {
        if (item.textContent.length < 70){
            return;
        } else {
            const str = item.textContent.slice(0, 71) + '...';
            item.textContent = str;
        }
    });

    function showConfirm(){
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);

        function frame() {
            if (counter === 10){
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            }
        }
    }
    function calcGoods(i) {
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length + i;
    }

    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price >  span');
        let total = 0;

        prices.forEach(function(item){
            total += +item.textContent;
        });
        totalCost.textContent = total;
    }

    function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach(function(btn){
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                calcGoods(0);
                calcTotal();

                const cartItems = cartWrapper.querySelectorAll('.goods__item');
                if(cartItems.length === 0){
                    let empty = document.createElement('div');
                    empty.innerText = 'Ваша корзина пока пуста';
                    empty.classList.add('empty');
                    cartWrapper.appendChild(empty);
                }
            });
        });
    }


});