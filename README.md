# Ecommerce App

## About Project

This is a full stack ecommerce app with Stripe & Sanity and deployed with vercel. **[See Live Version](https://ecommerce-7r14981sb-kaixianggu.vercel.app/)**

![Index page](assets/screenshots/FireShot%20Capture%20001%20-%20Kevin%20's%20ecommerce%20store%20-%20localhost.png "Optional Title")
![product page](assets/screenshots/FireShot%20Capture%20004%20-%20Kevin%20's%20ecommerce%20store%20-%20localhost.png)
![checkout page](assets/screenshots/FireShot%20Capture%20005%20-%20Kevin%20Gu%20-%20checkout.stripe.com.png)

### Built With

- Next.js
- React.js
- Sanity
- Stripe

### Key Features

##### Product details page

Add product to shooping cart. When click Buy Now button, shopping cart page will pop up with the quantities you selected.

##### Shopping cart

You may toggle quantities or remove products on shopping cart page. Total price and total quantities will also get updated.

##### Pay with Stripe

The payment API that I used for this website is Stripe. Customers will be redirected to checkout page.

##### Local Storage

You won't lose your shopping cart products after refresh the website.

## What I learnt

Before I started this project, I was tried to implement key functionalities that will be used in this project (eg: Create checkout session, connect with Sanity, Context API).

- File based routing, pages in Next.JS are associated with a route based on their file name.
- Context API, share data or state through components without pass down every level.
- Stripe, create a checkout session and POST products data with fetch API, and redirect to checkout page that provided by Sripe.
- Sanity, how to create schemas for this particular project and how to fetch data from Sanity Client.
- Others, localStorage, conditional rendering, useState, useEffect, deconstruct etc.

## Getting Started

### Usage

1. Clone the Repo

```bash
git clone https://github.com/KaixiangGU/Ecommerce-App.git
```

2. Install NPM packages

```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
