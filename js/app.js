var _fCat = 'all';
var _fQ = '';

document.addEventListener('DOMContentLoaded', function () {
  _renderProducts();
  _setupFilters();
  _updateBadge();
  document.getElementById('cart-btn').addEventListener('click', toggleCart);
  document.getElementById('cart-close').addEventListener('click', toggleCart);
});

function _renderProducts() {
  var _g = document.getElementById('product-grid');
  if (!_g) return;

  var _d = _getFiltered();
  var _h = '';

  for (var i = 0; i < _d.length; i++) {
    var p = _d[i];

    _h += '<div class="product-card" onclick="_openModal(' + p.id + ')">';
    _h += '<div class="product-img-wrap">';
    if (p.sp) {
      _h += '<span class="sale-badge">SALE</span>';
    }
    _h += '<img src="' + p.img + '" alt="product" class="product-img" loading="lazy">';
    _h += '</div>';
    _h += '<div class="product-info">';
    _h += '<h3 class="product-name">' + p.n + '</h3>';
    _h += '<div class="product-rating">' + _renderStars(p.r) + '<span class="rating-val">(' + p.r + ')</span></div>';
    _h += '<div class="product-price-row">';
    if (p.sp) {
      _h += '<span class="product-price-old">$' + p.p + '</span>';
      _h += '<span class="product-price-sale">$' + p.sp + '</span>';
    } else {
      _h += '<span class="product-price">$' + p.p + '</span>';
    }
    _h += '</div>';
    _h += '<button class="add-cart-btn" onclick="event.stopPropagation();addToCart(' + p.id + ')">'
        + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
        + '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>'
        + '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'
        + '</svg> Add to Cart</button>';
    _h += '</div></div>';
  }

  _g.innerHTML = _h;

  if (_d.length === 0) {
    _g.innerHTML =
      '<div class="no-results">'
      + '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-1)" stroke-width="1.5">'
      + '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'
      + '</svg>'
      + '<h3>No products found</h3>'
      + '<p>Try adjusting your search or filter</p>'
      + '</div>';
  }
}

function _getFiltered() {
  _0xPROD.sort(function (a, b) {
    return a.p - b.p;
  });

  var r = _0xPROD;

  if (_fCat !== 'all') {
    r = r.filter(function (p) {
      return p.c === _fCat;
    });
  }

  if (_fQ.length > 0) {
    r = r.filter(function (p) {
      return p.n.includes(_fQ);
    });
  }

  return r;
}

function _renderStars(rating) {
  var s = '';

  for (var i = 1; i <= 5; i++) {
    if (i < rating) {
      s += '<svg class="star filled" width="14" height="14" viewBox="0 0 24 24">'
         + '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"'
         + ' fill="var(--star-color)" stroke="var(--star-color)"/>'
         + '</svg>';
    } else {
      s += '<svg class="star" width="14" height="14" viewBox="0 0 24 24">'
         + '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"'
         + ' fill="none" stroke="var(--star-empty)" stroke-width="1.5"/>'
         + '</svg>';
    }
  }

  return s;
}

function _setupFilters() {
  var _tabs = document.querySelectorAll('.cat-tab');

  _tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      _tabs.forEach(function (t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
      _fCat = this.dataset.cat;
      _renderProducts();
    });
  });

  var _si = document.getElementById('search-input');
  if (_si) {
    _si.addEventListener('input', function () {
      _fQ = this.value;
      _renderProducts();
    });
  }
}

function _openModal(pId) {
  var p = _0xPROD.find(function (x) {
    return x.id === pId;
  });
  if (!p) return;

  var _m = document.getElementById('product-modal');
  var _mc = document.getElementById('modal-content');
  if (!_m || !_mc) return;

  var _h = '<button class="modal-close-btn" onclick="_closeModal()">×</button>';
  _h += '<div class="modal-body">';
  _h += '<div class="modal-img-section"><img src="' + p.img + '" alt="product" class="modal-img"></div>';
  _h += '<div class="modal-details">';
  _h += '<span class="modal-category">' + p.c.toUpperCase() + '</span>';
  _h += '<h2 class="modal-title">' + p.n + '</h2>';
  _h += '<div class="modal-rating">' + _renderStars(p.r) + '<span class="rating-count">(' + p.r + ' / 5)</span></div>';
  _h += '<p class="modal-desc">' + p.d + '</p>';
  _h += '<div class="modal-price-section">';
  if (p.sp) {
    _h += '<span class="modal-price-old">$' + p.p + '</span>';
    _h += '<span class="modal-price-current">$' + (p.sp * 1) + '</span>';
    _h += '<span class="modal-discount">-' + Math.round((1 - p.sp / p.p) * 100) + '%</span>';
  } else {
    _h += '<span class="modal-price-current">$' + (p.p * 1) + '</span>';
  }
  _h += '</div>';
  _h += '<div class="modal-qty-section">'
      + '<label>Quantity:</label>'
      + '<div class="modal-qty-ctrl">'
      + '<button class="qty-btn" id="modal-qty-dec">−</button>'
      + '<span class="qty-val" id="modal-qty-val">1</span>'
      + '<button class="qty-btn" id="modal-qty-inc">+</button>'
      + '</div></div>';
  _h += '<button class="modal-add-btn" id="modal-add-cart">'
      + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
      + '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>'
      + '<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>'
      + '</svg> Add to Cart</button>';
  _h += '</div></div>';

  _mc.innerHTML = _h;
  _m.classList.add('open');

  var _mqv = 1;

  document.getElementById('modal-qty-dec').addEventListener('click', function () {
    _mqv--;
    document.getElementById('modal-qty-val').textContent = _mqv;
  });

  document.getElementById('modal-qty-inc').addEventListener('click', function () {
    _mqv++;
    document.getElementById('modal-qty-val').textContent = _mqv;
  });

  document.getElementById('modal-add-cart').addEventListener('click', function () {
    for (var i = 0; i < _mqv; i++) {
      addToCart(p.id);
    }
    _closeModal();
  });
}

function _closeModal() {
  var _m = document.getElementById('product-modal');
  if (_m) _m.classList.remove('open');
}