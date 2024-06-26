import Image from "next/image";
import React from "react";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-row gap-8">
        {/* <Link legacyBehavior href="https://www.github.com/prankshadow" passHref>
          <Image
            src="/icons/github.svg"
            className="hover:cursor-pointer"
            alt="github logo"
            width={100}
            height={100}
          />
        </Link> */}
        <Link
          legacyBehavior
          href="https://www.linkedin.com/in/padmeshjakhmola"
          passHref
        >
          <Image
            src="/icons/linkedin.svg"
            className="hover:cursor-pointer"
            alt="linkedIn logo"
            width={100}
            height={100}
          />
        </Link>
        <Link legacyBehavior href="mailto:padmeshpj@gmail.com" passHref>
          <Image
            src="/icons/gmail.svg"
            className="hover:cursor-pointer"
            alt="gmail logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </div>
  );
};

export default Contact;
