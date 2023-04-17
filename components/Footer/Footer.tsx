export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer class="bg-[#ebf0ef] w-full bottom-0 relative pt-[100px] pb-[50px] border-b-4 border-solid border-[#83ff97]">
        <div class="l-container mx-auto xl:px-0 px-[12px]">
          <div class="grid lg:grid-cols-3 lg:gap-[24px] md:gap-y-0 gap-x-[24px] gap-y-[60px] lg:mb-[150px] mb-[120px] md:grid-cols-2 grid-cols-1">
            <div>
              <p class="text-[16px]">
                We would love to hear from you. For new business or general
                enquiries please e-mail us at:
              </p>
              <a href="mailto:info@kaszek.com" class="color-green font-bold uppercase text-[14px] tracking-[1px]" style="font-family: 'Maax Bold', sans-serif;">info@kaszek.com</a>
            </div>
            <div>
              <p class="text-[16px]">
                We invest across Latin America, with local presence in Bogotá,
                Mexico City, Montevideo and São Paulo.
              </p>
            </div>
            <div>
              <ul class="lg:flex-center-end flex items-center justify-start">
                <li><a target="_blank" rel="noopener" href="https://www.linkedin.com/company/2892335" class="arrow-icon color-green font-bold uppercase text-[14px] tracking-[1px] mr-[30px]" style="font-family: 'Maax Bold', sans-serif;">Linkedin</a></li>
                <li><a target="_blank" rel="noopener" href="https://www.instagram.com/kaszekventures" class="arrow-icon color-green font-bold uppercase text-[14px] tracking-[1px]" style="font-family: 'Maax Bold', sans-serif;">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="text-[16px]">© {currentYear} Kaszek. All Rights Reserved</div>
        </div>
        <style dangerouslySetInnerHTML={{
              __html: [
                  '.arrow-icon:after {',
                  '  content: "↗";',
                  '  display: inline-block;',
                  '  margin-left: 5px;',
                  '  vertical-align: baseline;',
                  '}'
                  ].join('\n')
              }}>
        </style>
      </footer>    
    );
  }
  