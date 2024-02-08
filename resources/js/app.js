/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import "./bootstrap";

import { createApp } from "vue";

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

const app = createApp({});

import LandingComponent from "./components/LandingComponent.vue";
app.component("landing-component", LandingComponent);
import ProductListComponent from "./components/ProductListComponent.vue";
app.component("product-list-component", ProductListComponent);
import CartComponent from "./components/CartComponent.vue";
app.component("cart-component", CartComponent);
import EmptyCartComponent from "./components/EmptyCartComponent.vue";
app.component("empty-cart-component", EmptyCartComponent);
import ButtonComponent from "./components/ButtonComponent.vue";
app.component("button-component", ButtonComponent);
import ModalComponent from "./components/ModalComponent.vue";
app.component("modal-component", ModalComponent);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */

app.mount("#app");