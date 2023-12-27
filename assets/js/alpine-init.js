document.addEventListener("alpine:init", () => {
    Alpine.store("shoppingCart", {
        products: Alpine.$persist(defaultProducts),
    });

    //SPA
    Alpine.store("router", {
        ROUTES_ENUM: {
            Dashboard: 0,
            Home: 1,
        },
        routes: [
            {
                path: "/dashboard",
                title: "Alpine Shopping Cart Dashboard CRUD",
                component: "dashboard",
            },
            {
                path: "/home",
                title: "Alpine Shopping Cart",
                component: "home",
            },
        ],
        currentRouteEnum: Alpine.$persist(1),
        goTo(routeEnum) {
            const routeInformation = this.routes[routeEnum];
            document.title = routeInformation.title;
            window.dispatchEvent(
                new CustomEvent("router-load-page", {
                    detail: routeInformation.component,
                })
            );
            this.currentRouteEnum = routeEnum;

            // can change url too
            // history.pushState(
            //     {},
            //     routeInformation.title,
            //     routeInformation.path
            // );

            //for full page reload
            // let currentUrl = window.location.origin;
            // window.location.href = `${currentUrl}/${this.routes[routeEnum].path}`;
        },
    });
});
