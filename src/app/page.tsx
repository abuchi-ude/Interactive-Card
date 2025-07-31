"use client";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import cardLogo from "../../public/card-logo.svg";
import complete from "../../public/icon-complete.svg";
import Image from "next/image";

interface FormErrors {
  name?: string;
  card?: string;
  month?: string;
  year?: string;
  cvc?: string;
}

export default function InteractiveCard() {
  const [nameValue, setNameValue] = useState("");
  const [cardValue, setCardValue] = useState("");
  const [monthValue, setMonthValue] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [cvcValue, setCvcValue] = useState("");
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };
  const handleCard = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;

    // 1. Clean the input: Remove all non-digit characters (including any existing spaces)
    const numericValue = rawValue.replace(/\D/g, "");
    //Limit the length
    const limitedValue = numericValue.slice(0, 16);
    // 2. Format the input: Add a space after every 4 digits for display purposes
    const formattedValue = limitedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardValue(formattedValue);
  };
  const handleMonth = (event: ChangeEvent<HTMLInputElement>) => {
    const rawValue =event.target.value
    const numericValue = rawValue.replace(/\D/g, "");

    setMonthValue(numericValue);
  };
  const handleYear = (event: ChangeEvent<HTMLInputElement>) => {
     const rawValue =event.target.value
    const numericValue = rawValue.replace(/\D/g, "");

    setYearValue(numericValue);
  };
  const handleCvc = (event: ChangeEvent<HTMLInputElement>) => {
     const rawValue =event.target.value
    const numericValue = rawValue.replace(/\D/g, "");

    setCvcValue(numericValue);
  };

  const changeSubmit = () => {
    setSubmit(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: FormErrors = {};
    if (!nameValue.trim()) {
      newErrors.name = "Can't be blank";
    }
    if (nameValue < '5') {
      newErrors.name = "Name must be more than 5";
    }
    // You can add more specific validation here
    if (!cardValue.trim() || cardValue.replace(/\s/g, "").length !== 16) {
      newErrors.card = "Card number must be 16 digits";
    }
   const month = parseInt(monthValue, 10);
  if (!monthValue.trim()) {
  newErrors.month = "Can't be blank";
  } 
  if (isNaN(month) || month < 1 || month > 12) {
  newErrors.month = "Invalid month";
  }
    if (!yearValue.trim()) {
      newErrors.year = "Can't be blank";
    }
    if (!cvcValue.trim()) {
      newErrors.cvc = "Can't be blank";
    }
    if (cvcValue < '3') {
      newErrors.cvc = "Must be up to 3 digit";
    }

    // Set the new errors in state
    setErrors(newErrors);

    // If there are no errors, proceed with submission
    if (Object.keys(newErrors).length === 0) {
      setSubmit(true);

      setNameValue("");
      setCardValue("");
      setCvcValue("");
      setMonthValue("");
      setYearValue("");
    }
  };
  return (
    <main className="container font-mono h-screen md:flex md:flex-row md:gap-8">
      {/* FIrst section */}
      <section className="pt-6 section-one bg-cover bg-no-repeat bg-center bg-[url('../../public/bg-main-mobile.png')] h-[40vh] w-12/12 mx-auto md:w-1/3 md:h-screen">
        <div className="flex flex-col shrink relative">
          <div className='back-card mr-2 bg-[url("/bg-card-back.png")] bg-center bg-no-repeat bg-contain w-[300px] h-[165px] flex items-center justify-end mx-auto md:mt-[110%] md:ml-[40%] lg:w-[370px] lg:h-[200px] xl:w-[420px] xl:h-[230px] xl:mt-[75%] xxl:mt-[150%]'>
            <p className="text-[10px] text-gray mr-[12%] md:text-[12px] lg:text-sm xl:text-base">
              {" "}
              {cvcValue ? cvcValue : "000"}{" "}
            </p>
          </div>
          <div className='front-card p-[5%] ml-4 absolute z-1 top-[55%] bg-[url("/bg-card-front.png")] bg-center bg-no-repeat bg-contain w-[300px] h-[165px] mx-auto md:left-[20%] md:top-[15%] lg:w-[370px] lg:top-[10%] lg:h-[200px] xl:w-[420px] xl:h-[230px]'>
            <Image
              src={cardLogo}
              alt="card-logo"
              className="w-1/5 mb-4 lg:w-2/5"
            />
            <div className="w-full flex flex-col shrink min-w-0 md:mt-[20%] mt-[20%] lg:mt-[10%]">
              <p className="card-number text-xl md:text-2xl lg:text-[29px] xl:text-[32px] text-gray tracking-wider">
                {cardValue ? cardValue : "0000 0000 0000 0000"}
              </p>
              <div className="text-gray text-xs lg:text-sm xl:text-base  mt-2 flex justify-between uppercase ">
                <p className="truncate mr-4">
                  {nameValue ? nameValue : "JANE APPLESEED"}
                </p>
                <p className="mr-4 md:mr-1">
                  <span>{monthValue ? monthValue : "00"}</span>/
                  <span>{yearValue ? yearValue : "00"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Second Section for form */}
      <section className=" section-two mt-[14%] text-[15px] p-6 md:ml-[15%] md:w-1/2 md:h-screen md:flex md:items-center md:justify-center md:mt-0 xl:w-3/5 xl:ml-[10%]">
        {!submit && (
          <form onSubmit={handleSubmit} className="md:w-full md:max-w-md">
            <div className="form flex flex-col gap-4">
              {/* Cardholder Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-xs font-bold uppercase text-violet-950 mb-1"
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  minLength={5}
                  required
                  autoComplete="name"
                  placeholder="e.g. Jane Appleseed"
                  value={nameValue}
                  onChange={handleName}
                  className="rounded-md border p-2 text-sm placeholder:text-gray-400"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}

              </div>

              {/* Card Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="card-number"
                  className="text-xs font-bold uppercase text-violet-950 mb-1"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  name="card-number"
                  required
                  inputMode="numeric"
                  id="card-number"
                  placeholder="e.g. 1234 5678 9123 0000"
                  value={cardValue}
                  onChange={handleCard}
                  className="rounded-md border p-2 text-sm placeholder:text-gray-400"
                />
                {errors.card && <p className="text-red-500 text-xs mt-1">{errors.card}</p>}
              </div>

              {/* Expiry and CVC */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="exp-date"
                    className="text-xs font-bold uppercase text-violet-950 mb-1"
                  >
                    Exp. Date (MM/YY)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="expMonth"
                      required
                      maxLength={2}
                      name="expMonth"
                      placeholder="MM"
                      inputMode="numeric"
                      value={monthValue}
                      onChange={handleMonth}
                      className="w-1/2 rounded-md border p-2 text-sm placeholder:text-gray-400"
                    />
                    {errors.month && <p className="text-red-500 text-xs mt-1">{errors.month}</p>}
                    <input
                      type="text"
                      id="expYear"
                      name="expYear"
                      required
                      maxLength={2}
                      placeholder="YY"
                      inputMode="numeric"
                      value={yearValue}
                      onChange={handleYear}
                      className="w-1/2 rounded-md border p-2 text-sm placeholder:text-gray-400"
                    />
                    {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                  </div>
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="cvc"
                    className="text-xs font-bold uppercase text-violet-950 mb-1"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="cvc"
                    id="cvc"
                    required
                    maxLength={3}
                    placeholder="e.g. 123"
                    value={cvcValue}
                    onChange={handleCvc}
                    className="w-full rounded-md border p-2 text-sm placeholder:text-gray-400"
                  />
                  {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                </div>
              </div>
              <button className="text-white bg-violet-950 hover:bg-violet-800 py-3 text-sm rounded-lg mt-4">
                Confirm
              </button>
            </div>
          </form>
        )}
        {submit && (
          <div className="flex mx-auto flex-col items-center text-center pt-[3%] px-[4%]">
            <div className="pb-5">
              <Image
                src={complete}
                alt="complete-icon"
                width={70}
                className="md:w-[100%]"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold mb-2 md:text-3xl lg:text-4xl xl:text-5xl">
                THANK YOU!
              </h1>{" "}
              <p className="text-gray2 mb-6 md:text-base lg:text-xl xl:text-2xl">
                We have added your details
              </p>
            </div>
            <div className="w-full">
              <button
                onClick={changeSubmit}
                className="text-white bg-purple-950 text-sm rounded-sm mt-2 py-3 px-4 w-full"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
