import Home from "./components/Home/HomeComponent.vue";
import Cart from "./components/Cart/CartComponent.vue";
import EmptyCart from "./components/Cart/EmptyCartComponent.vue";
import FilledCart from "./components/Cart/FilledCartComponent.vue";
import CheckoutConfirmation from "./components/Cart/CheckoutConfirmationComponent.vue";
import NotFound from "./components/NotFoundComponent.vue";

export const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart,
        children: [
            {
                path: "empty",
                component: EmptyCart,
            },
            {
                path: "details",
                component: FilledCart,
            },
            {
                path: "checkout",
                component: CheckoutConfirmation,
            },
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: NotFound,
    },
];
