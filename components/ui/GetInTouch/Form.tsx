import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import { ChangeEvent } from "preact/compat";

export interface Props {
  firstText: string;
  secondText: string;
  paragraph: string;
  round: Option[];
  contact: Contact[];
}

export type Option = {
  marginLeft?: number;
  marginRight?: number;
  value: string;
};

export type Contact = {
  name: string;
  email: string;
  link: string;
};

export default function Form(props: Props) {
  const [formData, setFormData] = useState({
    "your-name": "",
    "email": "",
    "firma": "",
    "whereIsBased": "",
    round: "",
    presentation: null as File | null,
    "your-message": "",
  });

  const [IncompleteField, setIncompleteField] = useState({
    "your-name": false,
    "email": false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formError, setFormError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
    setIncompleteField((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      "your-name": name,
      "email": email,
      "firma": company,
      "whereIsBased": whereIsBased,
      round,
      presentation,
      "your-message": message,
    } = formData;

    const formDataToSend = new FormData();

    formDataToSend.append("your-name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("firma", company);
    formDataToSend.append("whereIsBased", whereIsBased);
    formDataToSend.append("round", round);
    formDataToSend.append("presentation", presentation as Blob);
    formDataToSend.append("your-message", message);

    const requestOptions = {
      method: "POST",
      body: formDataToSend,
    };

    setIsLoading(true);

    fetch(
      "https://www.kaszek.com/wp-json/contact-form-7/v1/contact-forms/52/feedback",
      requestOptions,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status.toString());
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFormSubmitted(true);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        setFormSubmitted(false);
        if (error.message === "404" || error.message === "502") {
          setFormError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resetForm = () => {
    setFormData({
      "your-name": "",
      "email": "",
      "firma": "",
      "whereIsBased": "",
      round: "",
      presentation: null,
      "your-message": "",
    });
    setIncompleteField({
      "your-name": false,
      "email": false,
    });
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, presentation: file }));
    setSelectedFile(file);
  };

  const [selectedOption, setSelectedOption] = useState(props.round[0].value);

  return (
    <div class="relative flex flex-col xl:px-[0px] px-[12px]">
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
      <div class="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2">
        <form
          onSubmit={handleSubmit}
          class="w-full"
        >
          <fieldset class="grid gap-[16px] Maax-Regular-Font font-normal">
            <div class="grid grid-cols-2 gap-[25px]">
              <div>
                <input
                  type="text"
                  id="your-name"
                  name="your-name"
                  value={formData["your-name"]}
                  onInput={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  class="w-full py-[18px] px-[20px] bg-[#f1f5f5] focus:outline-none"
                  required
                />
                {IncompleteField["your-name"] && (
                  <span class="text-[#dc3232]">The field is required.</span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData["email"]}
                  onInput={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your email"
                  class="w-full py-[18px] px-[20px] bg-[#f1f5f5] focus:outline-none"
                  required
                />
                {IncompleteField["email"] && (
                  <span class="text-[#dc3232]">The field is required.</span>
                )}
              </div>
            </div>
            <div class="col-span-full grid grid-cols-1 gap-[16px]">
              <input
                type="text"
                id="firma"
                name="firma"
                value={formData["firma"]}
                onInput={handleChange}
                placeholder="Your Company"
                class="bg-[#f1f5f5] py-[18px] px-[20px] focus:outline-none"
              />
              <input
                type="text"
                id="whereIsBased"
                name="whereIsBased"
                value={formData["whereIsBased"]}
                onInput={handleChange}
                placeholder="Where is it based?"
                class="bg-[#f1f5f5] py-[18px] px-[20px] focus:outline-none"
              />
            </div>
            <fieldset class="flex flex-col mb-[16px]">
              <legend class="Maax-Bold-Font font-bold mb-[16px] text-[16px] leading-[24px]">
                What round of investment are you at?
              </legend>
              <div class="flex md:items-center flex-wrap md:flex-row flex-col">
                {Array.isArray(props.round)
                  ? (
                    props.round.map((option) => (
                      <label
                        key={option.value}
                        style={{
                          marginRight: option.marginRight,
                          marginLeft: option.marginLeft,
                        }}
                        class="whitespace-nowrap"
                      >
                        <input
                          type="radio"
                          name="round"
                          value={option.value}
                          onChange={() => {
                            setSelectedOption(option.value);
                          }}
                          class="mr-[15px] rounded-full cursor-pointer w-[16px] h-[16px]"
                          checked={selectedOption === option.value}
                        />
                        {option.value}
                      </label>
                    ))
                  )
                  : null}
              </div>
            </fieldset>
            <div class="grid grid-cols-1 col-span-full gap-[16px]">
              <label
                htmlFor="presentation"
                class="Maax-Bold-Font font-bold text-[16px] leading-[24px]"
              >
                Do you have a presentation?
              </label>
              <input
                type="file"
                id="presentation"
                name="presentation"
                size={40}
                onChange={handleFileChange}
                class="hidden"
              />
              <div class="flex items-center mb-[8px]">
                <label
                  htmlFor="presentation"
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
                id="your-message"
                cols={1}
                rows={6}
                name="your-message"
                value={formData["your-message"]}
                onInput={handleChange}
                placeholder="Hello Kaszek team..."
              />
              <div class="flex flex-col">
                <button
                  type="submit"
                  class="max-w-[280px] w-full bg-[#005046] text-[#83ff97] py-[20px] px-[2px] Maax-Bold-Font font-bold mt-[6px]"
                  disabled={isLoading}
                >
                  SEND
                </button>
                <span
                  className={`spinner ${
                    isLoading ? "opacity-100" : "opacity-0"
                  }`}
                >
                </span>
              </div>

              {Object.values(IncompleteField).some((error) => error) &&
                !formSubmitted &&
                !formError && (
                <span class="border-[#ffb900] border-[2px] border py-[0.2em] px-[1em]">
                  One or more fields have an error. Please check and try again.
                </span>
              )}
              {formSubmitted && !formError &&
                !Object.values(IncompleteField).some((error) => error) && (
                <span class="border-[#46b450] border-[2px] border py-[0.2em] px-[1em]">
                  Thank you for your message. It has been sent.
                </span>
              )}
              {formError && !formSubmitted &&
                !Object.values(IncompleteField).some((error) => error) && (
                <span class="border-[#dc3232] border-[2px] border py-[0.2em] px-[1em]">
                  Error sending the form. Please try again.
                </span>
              )}
            </div>
          </fieldset>
        </form>
        <div class="gap-[16px] flex justify-end">
          <div>
            {Array.isArray(props.contact)
              ? (
                props.contact.map((option) => (
                  <div class="max-w-[50%]">
                    <p
                      key={option.name}
                      class="whitespace-nowrap Maax-Bold-Font font-bold text-[16px] leading-[24px]"
                    >
                      {option.name}
                    </p>
                    <a
                      href={option.link}
                      class="Maax-Bold-Font text-bold text-[#005046] text-[14px] leading-[16px] tracking-[1px]"
                    >
                      {option.email}
                    </a>
                  </div>
                ))
              )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
