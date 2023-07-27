import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    body {
      margin: 0; line-height: normal;
    }
:root {

/* fonts */
--font-pretendard: Pretendard;

/* font sizes */
--font-size-lg: 18px;
--font-size-mini: 15px;
--font-size-xl: 20px;
--font-size-3xs: 10px;
--font-size-5xl: 24px;
--font-size-2xs: 11px;
--default-bold-body-size: 17px;

/* Colors */
--white: #fff;
--orange: #f19a37;
--brown: #716a56;
--black1: #252525;
--light-gray: #eaeef1;
--darkgray: #a3a2a4;
--darkgray2: #6A6A6A;
--black: #000;
--category1: #fff48b;
--category3: #ffe39a;
--hist-20: rgba(211, 230, 255, 0.2);
--hist-40: rgba(211, 230, 255, 0.4);
--hist-60: rgba(211, 230, 255, 0.6);
--hist-80: rgba(211, 230, 255, 0.8);
--hist-100: rgba(211, 230, 255, 1);
--task-20: rgba(255, 227, 154, 0.2);
--task-40: rgba(255, 227, 154, 0.4);
--task-60: rgba(255, 227, 154, 0.6);
--task-80: rgba(255, 227, 154, 0.8);
--task-100: rgba(255, 227, 154, 1);
--category2: #fffdc1;
--category4: #efe6ba;
--background: #FAF9F9;

/* Gaps */
--gap-3xs: 10px;
--gap-11xs: 2px;
--gap-8xs: 5px;

/* Paddings */
--padding-3xs: 10px;
--padding-mini: 15px;
--padding-16xl: 35px;
--padding-8xs: 5px;
--padding-5xs: 8px;
--padding-xs: 12px;
--padding-11xs: 2px;
--padding-xl: 20px;

/* border radiuses */
--br-6xl: 25px;
--br-5xs: 8px;
--br-xl: 20px;
--br-11xs: 2px;

}
`;
