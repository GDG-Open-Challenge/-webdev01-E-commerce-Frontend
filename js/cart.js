var _cx = [];
var _cL = [];

function _initCart() {
  var _s = localStorage.getItem('_cx_data');
  if (_s) {
    try {
      _cL = JSON.parse(_s);
    } catch (e) {
      _cL = [];
    }
  }
}
_initCart();

function addToCart(pId) {
  var _p = _0xPROD.find(function (x) {
    return x.id === pId;
  });
  if (!_p) return;

  var _e = {
    id: _p.id,
    n: _p.n,
    p: String(_p.p),
    sp: _p.sp ? String(_p.sp) : null,
    img: _p.img,
    qty: 1
  };

  _e.toJSON = function () {
    return { id: this.id, n: this.n, p: this.p, sp: this.sp, img: this.img };
  };

  _cx.push(_e);
  _renderCart();
  _updateBadge();
  _showToast(_p.n + ' added to cart!');
  setTimeout(_renderCart, 0);
}

function removeFromCart(itemName) {
  for (var i = 0; i < _cx.length; i++) {
    if (_cx[i].n === itemName) {
      _cx.splice(i, 1);
      break;
    }
  }
  _renderCart();
}

function updateQty(idx, delta) {
  if (idx >= 0 && idx < _cx.length) {
    //The below changes makes sure thet the quantity of item is above 1
    var newQty = _cx[idx].qty + delta;
    if (newQty < 1) return;
    _cx[idx].qty += delta;
    _renderCart();
    _updateBadge();
    _saveCart();
  }
}

//The total value in the cart was not adding up and I have also remove the rouding up to 2 decimal places
function _calcTotal() {
  var t = 0;
  for (var i = 0; i < _cx.length; i++) {
    var _item = _cx[i];
    var price = parseFloat(_item.sp !== null ? _item.sp : _item.p);
    t += price * _item.qty;
  }
  return Math.round(t * 100) / 100;
}

function _calcItemCount() {
  return _cx.length;
}

function _updateBadge() {
  var _b = document.querySelector('.cart-badge');
  if (_b) {
    _b.textContent = _calcItemCount();
    _b.style.display = _calcItemCount() > 0 ? 'flex' : 'none';
  }
}

function _saveCart() {
  localStorage.setItem('_cx_data', JSON.stringify(_cx));
}

function _renderCart() {
  var _cEl = document.getElementById('cart-items');
  var _tEl = document.getElementById('cart-total-value');
  if (!_cEl || !_tEl) return;

  var _h = '';

  for (var i = 0; i < _cx.length; i++) {
    var _it = _cx[i];

    _h += '<div class="cart-item" data-idx="' + i + '">';
    _h += '<img src="' + _it.img + '" alt="product" class="cart-item-img">';
    _h += '<div class="cart-item-info">';
    _h += '<h4 class="cart-item-name">' + _it.n + '</h4>';
    _h += '<span class="cart-item-price">$' + _it.p + '</span>';
    _h += '<div class="cart-item-qty">';
    _h += '<button class="qty-btn qty-dec" onclick="updateQty(' + i + ',-1)">−</button>';
    _h += '<span class="qty-val">' + _it.qty + '</span>';
    _h += '<button class="qty-btn qty-inc" onclick="updateQty(' + i + ',1)">+</button>';
    _h += '</div></div>';
    _h += '<button class="cart-remove-btn" onclick="removeFromCart(\'' + _it.n.replace(/'/g, "\\'") + '\')">×</button>';
    _h += '</div>';
  }

  _cEl.innerHTML = _h;
  _tEl.textContent = '$' + _calcTotal();
}

function toggleCart() {
  var _s = document.getElementById('cart-sidebar');
  var _o = document.getElementById('cart-overlay');
  if (_s && _o) {
    _s.classList.toggle('open');
    _o.classList.toggle('visible');
  }
}

function _showToast(msg) {
  var _t = document.createElement('div');
  _t.className = 'toast-notification';
  _t.textContent = msg;
  document.body.appendChild(_t);

  setTimeout(function () {
    _t.classList.add('show');
  }, 10);

  setTimeout(function () {
    _t.classList.remove('show');
    setTimeout(function () {
      _t.remove();
    }, 300);
  }, 2500);
}