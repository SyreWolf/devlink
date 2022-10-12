//This constant stores the styles of all the elements of the navbar and footer
export const layoutStyles = {
  navbar: {
    wrapper: 'fixed flex items-center justify-center z-40 top-4 left-1/2 translate-x-[-50%] w-fit gap-4 z-[9999]',
    selected_item: 'text-stone-50 shadow-[0_0_10px_#FFFFFF] cursor-default',
    clickable_item: 'text-stone-400 shadow-[0_0_5px_#1A1A1A] hover:text-stone-50 hover:shadow-[0_0_10px_#FFFFFF]',
    clicked_item: 'text-stone-50 shadow-[0_0_10px_#FFFFFF]',
    clickable_basis: 'bg-[#1A1A1A]/60 cursor-pointer w-fit h-14 rounded-full backdrop-blur-sm transition-all duration-[0.4s] ease-in-out',
  }
};


//This constant stores the values of all the elements of the navbar and footer
export const layoutValues = {
  navbar: {
    profile: [],
    info: [
      { href: '/faq', text: 'FAQ' },
      { href: '/aboutus', text: 'About_Us' },
      { href: '/contact', text: 'Contacto' },
      { href: '/cookies', text: 'Cookies' },
      { href: '/privacy', text: 'Privacidad' }
    ]
  }
};