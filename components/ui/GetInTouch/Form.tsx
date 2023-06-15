import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import { ChangeEvent } from "preact/compat";

export interface Props {
  firstText: string;
  secondText: string;
  paragraph: string;
  radioOption: Option[];
}

export type Option = {
  marginLeft?: number;
  marginRight?: number;
  value: string;
};

export default function Form(props: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    whereIsBased: "",
    radioOption: "",
    upload: null as File | null,
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
  });

  const handleChange = (
    event: h.JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBlur = (
    event: h.JSX.TargetedEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };
  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, company, whereIsBased, radioOption, upload, message } =
      formData;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        company,
        whereIsBased,
        radioOption,
        upload,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(
      "https://anacarolinadc.me/wp-json/contact-form-7/v1/contact-forms/501/feedback",
      requestOptions,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, upload: file }));
    setSelectedFile(file);
  };

  return (
    <div class="relative flex flex-col">
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
      </div>
      <div class="w-full max-w-[1200px] mx-auto">
        <form
          onSubmit={handleSubmit}
          class="max-w-[600px] w-full"
        >
          <fieldset class="grid gap-[16px] Maax-Regular-Font font-normal">
            <div class="grid grid-cols-2 gap-[25px]">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onInput={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  class="w-full py-[18px] px-[20px] bg-[#f1f5f5] focus:outline-none"
                  required
                />
                {formErrors.name && (
                  <span class="text-[#dc3232]">The field is required.</span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onInput={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your email"
                  class="w-full py-[18px] px-[20px] bg-[#f1f5f5] focus:outline-none"
                  required
                />
                {formErrors.email && (
                  <span class="text-[#dc3232]">The field is required.</span>
                )}
              </div>
            </div>
            <div class="col-span-full grid grid-cols-1 gap-[16px]">
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onInput={handleChange}
                placeholder="Your Company"
                class="bg-[#f1f5f5] py-[18px] px-[20px] focus:outline-none"
              />
              <input
                type="text"
                id="whereIsBased"
                name="whereIsBased"
                value={formData.whereIsBased}
                onInput={handleChange}
                placeholder="Where is it based?"
                class="bg-[#f1f5f5] py-[18px] px-[20px] focus:outline-none"
              />
            </div>
            <fieldset class="flex flex-col">
              <legend class="Maax-Bold-Font font-bold mb-[16px]">
                What round of investment are you at?
              </legend>
              <div class="flex items-center">
                {Array.isArray(props.radioOption)
                  ? (
                    props.radioOption.map((option) => (
                      <label
                        key={option.value}
                        style={{
                          marginRight: option.marginRight,
                          marginLeft: option.marginLeft,
                        }}
                      >
                        <input
                          type="radio"
                          name="radioOption"
                          value={option.value}
                          onInput={handleChange}
                          class="mr-[15px] rounded-full cursor-pointer w-[16px] h-[16px]"
                        />
                        {option.value}
                      </label>
                    ))
                  )
                  : null}
              </div>
            </fieldset>
            <div class="grid grid-cols-1 col-span-full gap-[16px]">
              <label htmlFor="upload" class="Maax-Bold-Font font-bold">
                Do you have a presentation?
              </label>
              <input
                type="file"
                id="upload"
                name="upload"
                size={40}
                onChange={handleFileChange}
                class="hidden"
              />
              <div class="flex items-center mb-[8px]">
                <label
                  htmlFor="upload"
                  class="Maax-Bold-Font text-bold text-[#005046] text-[14px] leading-[16px] tracking-[1px]"
                >
                  UPLOAD ↗
                </label>
                {selectedFile && (
                  <span class="ml-[12px] leading-[16px]">
                    {selectedFile.name}
                  </span>
                )}
              </div>
              <textarea
                class="col-span-full bg-[#f1f5f5] py-[18px] px-[20px] focus:outline-none"
                id="message"
                cols={1}
                rows={6}
                name="message"
                value={formData.message}
                onInput={handleChange}
                placeholder="Hello Kaszek team..."
              />
              <button
                type="submit"
                class="max-w-[280px] bg-[#005046] text-[#83ff97] py-[20px] px-[2px] Maax-Bold-Font font-bold"
              >
                SEND
              </button>
              {Object.values(formErrors).some((error) => error) && (
                <span class="text-[#dc3232]">
                  One or more fields have an error. Please check and try again.
                </span>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
