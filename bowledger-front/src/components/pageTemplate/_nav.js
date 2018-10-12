export default {
  items: [
    {
      name: '블록탐색기',
      url: '/explorer',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Dashboard',
          url: '/explorer/dashboard',
          icon: 'icon-puzzle'
        },
        {
          name: 'Network',
          url: '/explorer/network',
          icon: 'icon-puzzle'
        },
        {
          name: 'Blocks',
          url: '/explorer/blocks',
          icon: 'icon-puzzle'
        },
        {
          name: 'Tracsactions',
          url: '/explorer/transactions',
          icon: 'icon-puzzle'
        },
        {
          name: 'Chaincode',
          url: '/explorer/chaincode',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: '캘리퍼',
      url: '/caliper',
      icon: 'icon-puzzle'
      // children: [
      //   {
      //     name: 'Breadcrumbs',
      //     url: '/base/breadcrumbs',
      //     icon: 'icon-puzzle'
      //   }
      // ]
    },
    {
      name: '회원관리',
      url: '/users',
      icon: 'icon-puzzle',
      children: [
        // {
        //   name: '회원목록',
        //   url: '/users/list',
        //   icon: 'icon-puzzle'
        // },
        // {
        //   name: '회원추가',
        //   url: '/users/register',
        //   icon: 'icon-puzzle'
        // },
        {
          name: '일반회원',
          url: '/users/general',
          icon: 'icon-puzzle'
        }
      ]
    }
  ]
};
