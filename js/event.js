let data = JSON.parse(localStorage.getItem('productDatas'))[0]

const productDatas = [
  {
    productUrl: data.producturl,
    unitPrice: data.unitPrice,
    sumPrice: data.unitPrice*data.num,
    num: data.num,
    name: data.name,
    info: data.info
  },
  // {
  //   productUrl: 'http://i1.mifile.cn/a1/pms_1490088819.36556534!180x180.jpg',
  //   unitPrice: 999,
  //   sumPrice: 999,
  //   num: 1,
  //   name: '红米Note 4X',
  //   info: '红米Note 4X 全网通版 香槟金 32GB',
  // }
]

window.onload = () => {
  document.querySelector('.cart-list>ul').innerHTML = productDatas.map(productData => {
    return `
    <li class="item">
      <div class="ui-box">
        <div class="choose status-1"></div>
        <div class="imgProduct">
          <a href="#">
            <img src="${productData.productUrl}">
          </a>
        </div>
        <div class="info ui-box-flex">
          <div class="name">
            <p>
              <span>${productData.info}</span>
            </p>
          </div>
          <div class="price">
            <p>
              <span>售价：</span>
              <span>${productData.unitPrice}元</span>
              <span>合计：</span>
              <span>${productData.sumPrice}元</span>
            </p>
            <p></p>
          </div>
          <div class="num">
            <div class="xm-input-number">
              <div class="input-sub"></div>
              <div class="input-num">
                <span>${productData.num}</span>
              </div>
              <div class="input-add active"></div>
            </div>
            <div class="delete">
              <a href="javascript:;">
                <span class="icon-iconfontshanchu"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="append">
        <div class="insurance">
          <a href="http://m.mi.com/#/product/insurance?goods_id=2170900002&consumption=1&parent_itemId=2170800002_0_buy" data-log="insurance">
            <div class="i1">
              <img src="http://s1.mi.com/m/images/m/insurance.png">
            </div>
            <div class="i2">
              <span>${productData.name} 意外险 79元/年</span>
            </div>
            <div class="i3">
              <span>购买服务</span>
            </div>
          </a>
        </div>
      </div>
    </li>
    `
  }).join('')

  document.querySelector('.bottom-submit>.price>span').innerHTML = `共${data.num}件 金额：`
  document.querySelector('.bottom-submit>.price>strong').innerHTML = `${productDatas[0].sumPrice}.00`

  const list = document.querySelector('.list'),
        search = document.querySelector('.icon-search'),
        home = document.querySelector('.home'),
        inputSub = document.querySelector('.input-sub'),
        inputAdd = document.querySelector('.input-add'),
        inputNum = document.querySelector('.input-num>span'),
        // choose = document.querySelector('.choose'),
        unitPrice = parseInt(document.querySelector('.bottom-submit>.price>strong').innerHTML),
        deleteProduct = document.querySelector('.icon-iconfontshanchu')
        html = list.innerHTML
  let isClicked = false,
      count = data.num

  home.addEventListener('click', () => {
    window.location.href = 'http://m.mi.com/#/index'
  }, false)

  search.addEventListener('click', () => {
    window.location.href = 'http://m.mi.com/#/search/index'
  }, false)

inputSub.addEventListener('click', () => {
  if(parseInt(inputNum.innerHTML) > 1) {
    inputNum.innerHTML = --count;
    inputAdd.classList.add('active')
    document.querySelector('.bottom-submit>.price>span').innerHTML = `共${count}件 金额：`
    document.querySelector('.bottom-submit>.price>strong').innerHTML = count*unitPrice + '.00'
    document.querySelectorAll('.info>.price>p>span')[3].innerHTML = count*unitPrice + '元'
  }
  if(parseInt(inputNum.innerHTML) <= 1) {
    inputNum.innerHTML = 1
    inputSub.classList.remove('active')
  }
}, false)

inputAdd.addEventListener('click', () => {
  isClicked = !isClicked
  if(parseInt(inputNum.innerHTML) < 5) {
    inputNum.innerHTML = ++count;
    inputSub.classList.add('active')
    document.querySelector('.bottom-submit>.price>span').innerHTML = `共${count}件 金额：`
    document.querySelector('.bottom-submit>.price>strong').innerHTML = count*unitPrice + '.00'
    document.querySelectorAll('.info>.price>p>span')[3].innerHTML = count*unitPrice + '元'
  }
  if(parseInt(inputNum.innerHTML) >= 5) {
    inputNum.innerHTML = 5
    inputAdd.classList.remove('active')
  }
  if(isClicked && parseInt(inputNum.innerHTML) >= 5) {
    document.querySelector('.maxnum').style.display = 'block'
  } else {
    document.querySelector('.maxnum').style.display = 'none'
  }
}, false)

// choose.addEventListener('click', () => {
//   isClicked = !isClicked
//   if(isClicked) {
//     choose.classList.remove('status-1')
//     choose.classList.add('status-0')
//     while(list.firstChild) {
//       list.removeChild(list.firstChild)
//     }
//     document.querySelector('.bottom-submit>.price>span').innerHTML = `共0件 金额：`
//     document.querySelector('.bottom-submit>.price>strong').innerHTML = 0
//   } else {
//     choose.classList.remove('status-0')
//     choose.classList.add('status-1')
//     list.innerHTML = html
//     document.querySelector('.bottom-submit>.price>span').innerHTML = `共${count}件 金额：`
//     document.querySelector('.bottom-submit>.price>strong').innerHTML = count*unitPrice + '.00'
//   }
// }, false)

// deleteProduct.addEventListener('click', () => {
//   document.querySelector('.cart-list>ul').removeChild(document.querySelector('.cart-list>ul>li'))
//   // window.location.href = "http://m.mi.com/#/cart/index"
  document.querySelector('.cart-list>ul').addEventListener('click', (e) => {
    if(e.target && e.target.nodeName == 'SPAN' && e.target.className == 'icon-iconfontshanchu') {
      let node = e.target
      while(node.nodeName != 'LI') {
        node = node.parentNode
      }
      document.querySelector('.cart-list>ul').removeChild(node)
      if(document.querySelectorAll('.cart-list ul li').length < 1) {
        window.location.href = "http://m.mi.com/#/cart/index"
      }
    }

    if(e.target && e.target.nodeName == 'DIV' && e.target.className.indexOf('choose')>-1) {
      let choose = e.target
      isClicked = !isClicked
      if(isClicked) {
        choose.classList.remove('status-1')
        choose.classList.add('status-0')
        while(list.firstChild) {
          list.removeChild(list.firstChild)
        }
        document.querySelector('.bottom-submit>.price>span').innerHTML = `共0件 金额：`
        document.querySelector('.bottom-submit>.price>strong').innerHTML = 0
      } else {
        choose.classList.remove('status-0')
        choose.classList.add('status-1')
        list.innerHTML = html
        document.querySelector('.bottom-submit>.price>span').innerHTML = `共${count}件 金额：`
        document.querySelector('.bottom-submit>.price>strong').innerHTML = count*unitPrice + '.00'
      }
    }
  })
// })
}
