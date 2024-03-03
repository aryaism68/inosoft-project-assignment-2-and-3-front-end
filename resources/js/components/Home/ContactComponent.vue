<template>
    <div class="absolute-position">
        <div class="dropdown">
            <h1 class="contact-text">Contact</h1>
            <div class="dropdown-content">
                <a href="https://www.aureliabakery.com/">Website</a>
                <a href="mailto:aureliabakery@gmail.com">E-mail</a>
                <a href="https://api.whatsapp.com/send?phone=628562343000"
                    >WhatsApp</a
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
.absolute-position {
    position: absolute;
    top: 3%;
    right: 3%;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.contact-text {
    color: orange;
    margin: 30% 0 0 0;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff5e3;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    color: orange;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #fad67e;
    color: darkorange;
}

.dropdown:hover .contact-text {
    color: darkorange;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>
