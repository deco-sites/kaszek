import { useEffect, useRef, useState } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { asset } from "$fresh/runtime.ts";

export type Logo = {
  image: LiveImage;
  label: string;
  link: string;
  width: number;
  height?: number;
  filter: Filter;
};

export type Filter = {
  category: Array<string>;
  hq: Array<string>;
  companyStatus: Array<string>;
};

export type Props = {
  firstText: string;
  secondText?: string;
  paragraph?: string;
  logos: Array<Logo>;
};

export default function Category(props: Props) {
  const [selectedFilters, setSelectedFilters] = useState<Filter>({
    category: ["All"],
    hq: ["All"],
    companyStatus: ["Active"],
  });

  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableHQ, setAvailableHQ] = useState<string[]>([]);
  const [availableCompanyStatus, setAvailableCompanyStatus] = useState<
    string[]
  >([]);

  const { category, hq, companyStatus } = selectedFilters;

  useEffect(() => {
    const categories = props.logos.reduce((acc: string[], logo) => {
      const logoCategories = logo.filter.category;
      logoCategories.forEach((category) => {
        if (!acc.includes(category)) {
          acc.push(category);
        }
      });
      return acc;
    }, []);
    setAvailableCategories(["All", ...categories]);

    const hqOptions = props.logos.reduce((acc: string[], logo) => {
      const logoHQs = logo.filter.hq;
      logoHQs.forEach((hq) => {
        if (!acc.includes(hq)) {
          acc.push(hq);
        }
      });
      return acc;
    }, []);
    setAvailableHQ(["All", ...hqOptions]);

    const companyStatusOptions = props.logos.reduce((acc: string[], logo) => {
      const logoCompanyStatuses = logo.filter.companyStatus;
      logoCompanyStatuses.forEach((companyStatus) => {
        if (!acc.includes(companyStatus)) {
          acc.push(companyStatus);
        }
      });
      return acc;
    }, []);
    setAvailableCompanyStatus(["All", ...companyStatusOptions]);
  }, [props.logos]);

  const handleFilterChange = (filterType: keyof Filter, value: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value === "All" ? [] : [value],
    }));

    setIsCategoryDropdownOpen(false);
    setIsHQDropdownOpen(false);
    setIsCompanyStatusDropdownOpen(false);
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (event: Event) => {
    const inputValue = (event.target as HTMLInputElement).value;
    setSearchValue(inputValue);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredLogos = props.logos.filter((logo) => {
    const logoCategoryOptions = logo.filter.category;
    const logoHQOptions = logo.filter.hq;
    const logoCompanyStatusOptions = logo.filter.companyStatus;

    const isCategoryMatch = category.length === 0 ||
      category.includes("All") ||
      logoCategoryOptions.some((option) => category.includes(option));
    const isHQMatch = hq.length === 0 ||
      hq.includes("All") ||
      logoHQOptions.some((option) => hq.includes(option));
    const isCompanyStatusMatch = companyStatus.length === 0 ||
      companyStatus.every((option) =>
        logoCompanyStatusOptions.includes(option)
      );

    const isSearchMatch = logo.label.toLowerCase().includes(
      searchValue.toLowerCase(),
    );

    return isCategoryMatch && isHQMatch && isCompanyStatusMatch &&
      isSearchMatch;
  });

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isHQDropdownOpen, setIsHQDropdownOpen] = useState(false);
  const [isCompanyStatusDropdownOpen, setIsCompanyStatusDropdownOpen] =
    useState(false);

  const dropdowns = [
    {
      id: "category",
      placeholder: "Category",
      selected: category.length === 0 ? "Category" : category,
      items: availableCategories,
      isOpen: isCategoryDropdownOpen,
      selectedItems: category,
    },
    {
      id: "hq",
      placeholder: "HQ",
      selected: hq.length === 0 ? "HQ" : hq,
      items: availableHQ,
      isOpen: isHQDropdownOpen,
      selectedItems: hq,
    },
    {
      id: "companyStatus",
      placeholder: "Company Status",
      selected: companyStatus.length === 0 ? "Company Status" : companyStatus,
      items: availableCompanyStatus,
      isOpen: isCompanyStatusDropdownOpen,
      selectedItems: companyStatus,
    },
  ];

  const toggleDropdown = (dropdownId: string) => {
    setIsCategoryDropdownOpen(
      dropdownId === "category" ? !isCategoryDropdownOpen : false,
    );
    setIsHQDropdownOpen(dropdownId === "hq" ? !isHQDropdownOpen : false);
    setIsCompanyStatusDropdownOpen(
      dropdownId === "companyStatus" ? !isCompanyStatusDropdownOpen : false,
    );
  };

  const startRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (startRef.current !== null && endRef.current !== null) {
        const endTop = endRef.current.offsetTop;
        const isTopReached = window.scrollY <= 460;
        const isPositionReached = window.scrollY >= endTop;
        setIsSticky(!isTopReached && !isPositionReached);
      }
    };

    addEventListener("scroll", handleScroll);
    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    addEventListener("resize", handleResize);

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  const arrowIcon = (
    <object
      data={asset(`/arrow-down.svg`)}
      aria-label="arrow menu toggle"
      width="23.99"
      height="23.99"
      class="transform"
    />
  );

  const changeColor = `${
    isCategoryDropdownOpen || isHQDropdownOpen ||
      isCompanyStatusDropdownOpen
      ? "bg-white"
      : "bg-[#ebf0ef]"
  }`;

  const searchIcon = (
    <object
      data={asset(`/search.svg`)}
      aria-label="search input toggle"
      width="24"
      height="24"
      class={`${
        isCategoryDropdownOpen || isHQDropdownOpen ||
          isCompanyStatusDropdownOpen
          ? "fill-white"
          : "fill-[#ebf0ef]"
      }`}
    />
  );

  return (
    <div class="relative flex flex-col items-center">
      <div class="w-full flex flex-col justify-center mt-[80px]">
        <div class="w-full max-w-[1200px] mx-auto md:pt-20 md:mb-[120px] pt-[30px] mb-[40px]">
          <h1 class="Noe-Display-Font font-bold text-[#005046] tracking-[-0.5px] md:mr-0 md:ml-0 mr-3 ml-3 mb-[20px] md:text-[76px] text-[36px] md:leading-[76px] leading-[39.6px]">
            {props.firstText}
            <br />
            {props.secondText}
          </h1>
          <p class="md:mt-[62px] mt-[40px] lg:max-w-category-desktop mobile:max-w-category-tablet md:mr-0 md:ml-0 mr-3 ml-3 Maax-Regular-Font">
            {props.paragraph}
          </p>
        </div>
        <div class="w-full">
          <div
            ref={startRef}
            class={` flex gap-x-[24px] w-full md:mb-[60px] z-10 ${
              isSticky ? "fixed top-[80px] bg-white" : "relative"
            }`}
          >
            <div
              class={`max-w-[1200px] w-full xl:mx-auto mx-[12px] relative flex gap-x-[24px] grid md:grid-template grid-cols-2 z-10 py-[12px]`}
            >
              {isMobile
                ? (
                  <div
                    id="filterMenu"
                    class="block py-[16px] px-[20px] bg-[#ebf0ef] text-bold flex justify-between cursor-pointer"
                    onClick={() =>
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  >
                    <span class="Maax-Bold-Font text-[16px] leading-[24px]">
                      Filter
                    </span>
                    <span
                      class={`transform pointer-events-none ${
                        isCategoryDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      {arrowIcon}
                    </span>
                  </div>
                )
                : (
                  dropdowns.map((dropdown) => (
                    <div
                      id={dropdown.id}
                      class={`block py-[16px] px-[20px] bg-[#ebf0ef] text-bold flex justify-between cursor-pointer`}
                      onClick={() => toggleDropdown(dropdown.id)}
                    >
                      <span class="Maax-Bold-Font text-[16px] leading-[24px]">
                        {dropdown.items.length === 0
                          ? dropdown.placeholder
                          : dropdown.placeholder}
                      </span>
                      <span
                        class={`transform pointer-events-none ${
                          isCategoryDropdownOpen || isHQDropdownOpen ||
                            isCompanyStatusDropdownOpen
                            ? "rotate-180"
                            : "rotate-0"
                        }`}
                      >
                        {arrowIcon}
                      </span>
                    </div>
                  ))
                )}
              <div class="relative z-10 flex justify-end">
                {isSearchOpen
                  ? (
                    <div class="relative md:max-w-[300px] w-[100%] transition-all duration-300 ease-in-out">
                      <input
                        type="search"
                        id="searchInput"
                        class={`
                        ${changeColor}
                        pl-[56px] pr-[16px] py-[16px] focus:outline-none outline-none transition-all duration-300 ease-in-out w-full absolute right-0`}
                        value={searchValue}
                        onChange={handleSearchChange}
                        ref={inputRef}
                      />
                      <span class="absolute left-[16px] top-1/2 transform -translate-y-1/2">
                        {searchIcon}
                      </span>
                    </div>
                  )
                  : (
                    <div
                      class={`${changeColor} w-[56px] h-[56px] rounded-[28px] flex justify-center items-center cursor-text transition-all duration-300 ease-in-out`}
                      onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                      <span class="pointer-events-none">
                        {searchIcon}
                      </span>
                    </div>
                  )}
              </div>
            </div>

            {(isCategoryDropdownOpen || isHQDropdownOpen ||
              isCompanyStatusDropdownOpen) && (
              <div class="absolute w-full pt-[4rem] pb-[12px] top-[-12px] bg-[#ebf0ef] origin-top-left">
                <div class="max-w-[1200px] md:mx-auto mx-[12px]">
                  <div class="w-full grid md:grid-template grid-cols-2 flex gap-x-[24px]">
                    {dropdowns.map((dropdown) => (
                      <div class="mt-[20px] pl-[20px]">
                        {isMobile && (
                          <p class="Maax-Bold-Font text-[16px] leading-[24px] mb-[32px]">
                            {dropdown.items.length === 0
                              ? dropdown.placeholder
                              : dropdown.placeholder}
                          </p>
                        )}
                        {dropdown.items
                          .sort((a, b) => {
                            if (a === "All") return -1;
                            if (b === "All") return 1;
                            return a.localeCompare(b);
                          })
                          .map((item) => (
                            <div
                              class={`${
                                dropdown.selectedItems.includes(item)
                                  ? "bg-[#ebf0ef]"
                                  : ""
                              }`}
                              onClick={() =>
                                handleFilterChange(
                                  dropdown.id as keyof Filter,
                                  item,
                                )}
                            >
                              <span class="block cursor-pointer mb-[8px]">
                                <span
                                  class={`${
                                    dropdown.selectedItems.includes(item) ||
                                      (dropdown.selectedItems.length === 0 &&
                                        item === "All")
                                      ? "border-b-[2px] border-[#83ff97] Maax-Bold-Font"
                                      : "Maax-Regular-Font"
                                  }`}
                                  style={{
                                    display: dropdown.placeholder.length > 10
                                      ? ""
                                      : "inline-block",
                                    overflowWrap: "break-word",
                                  }}
                                >
                                  {item}
                                </span>
                              </span>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div class="w-full max-w-[1200px] mx-auto grid grid-cols-two lg:grid-cols-six md:grid-cols-four xl:px-[0px] px-[12px] gap-[24px]">
          {filteredLogos.map((logo, index) => (
            <div
              ref={endRef}
              key={index}
              class={`flex justify-center border-b-[1px] border-[#83ff97]`}
            >
              <a
                href={logo.link}
                class={`max-w-[180px] w-full aspect-square flex justify-center`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={logo.image}
                  alt={logo.label}
                  class={`object-contain w-full max-w-[162px]`}
                  width={logo.width}
                  height={logo.height}
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
