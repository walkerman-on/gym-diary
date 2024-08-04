import React, { FC, useState } from 'react';
import cl from "./Category.module.scss"
import { IExerciseCategory } from 'features/categories';


interface ICategory {
    handleClick: (categoryId: string) => void,
    categories: IExerciseCategory[],
    selectedCategoryId: string
}

export const Category: FC<ICategory> = React.memo(({ handleClick, categories, selectedCategoryId }) => {
    return (
        <>
            {categories?.map(item => (

                <li
                    className={`${cl.category__item} ${item.id === selectedCategoryId ? cl.category__current : ''}`}
                    key={item?.id}
                    onClick={() => handleClick(item?.id)}
                >
                    <span className={cl.title}>{item?.title}</span>
                </li>
            ))}
        </>
    );
})

