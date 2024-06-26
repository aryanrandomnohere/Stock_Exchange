export const tableTheme = {
  root: {
    base: "w-full text-center text-sm text-gray-400",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full rounded-md drop-shadow-md",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "px-0 py-2 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-50 whitespace-nowrap",
    cell: {
      base: "px-0 pb-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-[#28272c] border-b border-gray-500",
    },
  },
  row: {
    base: "group/row bg-[#28272c] text-xs border-b border-gray-500 whitespace-nowrap",
    hovered: "hover:bg-gray-50",
  },
};

export const sidebarTheme = {
  root: {
    base: "h-full",
    collapsed: {
      on: "w-16",
      off: "w-[350px]",
    },
    inner:
      "h-full overflow-y-auto overflow-x-hidden rounded bg-white px-3 py-4 dark:bg-gray-800",
  },
  collapse: {
    button:
      "group flex w-full items-center rounded-lg p-2 pl-1 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    icon: {
      base: "h-6 w-6 text-black transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white",
      open: {
        off: "",
        on: "text-gray-900",
      },
    },
    label: {
      base: "pl-3 flex-1 whitespace-nowrap text-left font-normal text-sm",
      icon: {
        base: "h-6 w-6 transition delay-0 ease-in-out",
        open: {
          on: "rotate-180",
          off: "",
        },
      },
    },
    list: "space-y-2 py-1",
  },
  cta: {
    base: "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
    color: {
      blue: "bg-cyan-50 dark:bg-cyan-900",
      dark: "bg-dark-50 dark:bg-dark-900",
      failure: "bg-red-50 dark:bg-red-900",
      gray: "bg-alternative-50 dark:bg-alternative-900",
      green: "bg-green-50 dark:bg-green-900",
      light: "bg-light-50 dark:bg-light-900",
      red: "bg-red-50 dark:bg-red-900",
      purple: "bg-purple-50 dark:bg-purple-900",
      success: "bg-green-50 dark:bg-green-900",
      yellow: "bg-yellow-50 dark:bg-yellow-900",
      warning: "bg-yellow-50 dark:bg-yellow-900",
    },
  },
  item: {
    base: "flex items-center justify-center rounded-lg p-1 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    active: "bg-gray-100 dark:bg-gray-700",
    collapsed: {
      insideCollapse: "group w-full pl-10 transition duration-75",
      noIcon: "font-bold",
    },
    content: {
      base: "flex-1 whitespace-nowrap px-3 text-sm font-normal",
    },
    icon: {
      base: "h-6 w-6 flex-shrink-0 text-black transition duration-75 group-hover:text-black dark:text-gray-400 dark:group-hover:text-white",
      active: "text-black dark:text-gray-100",
    },
    label: "",
    listItem: "",
  },
  items: {
    base: "text-black",
  },
  itemGroup: {
    base: "mt-3 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700",
  },
  logo: {
    base: "mb-5 flex items-center pl-2.5",
    collapsed: {
      on: "hidden",
      off: "self-center whitespace-nowrap text-xl font-normal dark:text-white",
    },
    img: "mr-3 h-6 sm:h-7",
  },
};

export const navbarTheme = {
  root: {
    base: "bg-white py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-4",

    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center justify-between",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full md:block md:w-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 pl-3 pr-4 md:p-0",
    active: {
      on: "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
      off: "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    disabled: {
      on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
      off: "",
    },
  },
  toggle: {
    base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
    icon: "h-6 w-6 shrink-0",
  },
};

export const cardTheme = {
  root: {
    base: "flex rounded-xl bg-white shadow-none dark:border-gray-700 dark:bg-gray-800 w-full",
    children: "flex flex-col justify-center gap-4 p-6",
    horizontal: {
      off: "flex-col",
      on: "flex-col md:max-w-xl md:flex-row",
    },
    href: "hover:none dark:hover:none",
  },
  img: {
    base: "",
    horizontal: {
      off: "rounded-t-lg",
      on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
    },
  },
};
