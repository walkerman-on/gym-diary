import { Categories } from 'features/categories/ui/categories';
import React from 'react';
import cl from "./CategoriesCard.module.scss"

export const CategoriesCard = React.memo(() => {
    return (
        <section className={cl.categoriesCard}>
            <Categories />
        </section>
    );
})