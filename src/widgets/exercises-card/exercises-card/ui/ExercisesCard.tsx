import cl from "./ExercisesCard.module.scss";
import { ExercisesSearchCard } from 'widgets/exercises-card/exercises-search-card';
import { CategoriesCard } from 'widgets/categories-card';
import { ExercisesCategoryCard } from 'widgets/exercises-card/exercises-category-card';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Outlet } from "react-router-dom";

export const ExercisesCard = () => {
    // const { exercise__search } = useAppSelector(state => state?.exercises);
    return (
        <div className={cl.ExercisesCard}>
            {/* {
                exercise__search
                    ? <ExercisesSearchCard />
                    :
                    <>
                        <CategoriesCard />
                        <ExercisesCategoryCard />
                    </>
            } */}
            {/* <CategoriesCard /> */}
            {/* <ExercisesCategoryCard /> */}

            {/* <Outlet /> */}

        </div>
    );
};
