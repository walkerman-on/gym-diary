import React, { useEffect, useState } from 'react';
import cl from "./CreateExerciseofCategoryPage.module.scss";
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { getCreateExercise } from 'app/providers/router';
import { createExercise } from "shared/helper/createExercise";
// import { fetchCategoryCurrent } from 'entities/exercisesCategory/api/fetchCategoryCurrent';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import { deleteExercises } from 'shared/helper/deleteExercise';
import { Skeleton } from 'shared/ui/skeleton';
// import { Exercises } from 'widgets/exercises';
import { useAuth } from 'features/auth/hooks/useAuth';

export const CreateExerciseofCategoryPage = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const [exerciseName, setExerciseName] = useState<string>("");
    // const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

    // useEffect(() => {
    //     dispatch(fetchCategoryCurrent({ categoryId: categoryId, userId: user.id }));
    // }, []);

    const { category__current, error, loading } = useAppSelector(state => state?.categories);

    const handleOnChange = (e: any) => {
        setExerciseName(e.target.value);
    };

    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(getCreateExercise());
    };


    const createExerciseOnClick = async () => {
        createExercise(categoryId, { name: exerciseName, userId: user.id });
        setExerciseName('');
        // dispatch(fetchCategoryCurrent({ categoryId, userId: user.id }));
    };
    // const selectedExercises = currentCategory?.exercises?.filter(item => item?.selected === true)
    // const selectedExercisesIds = selectedExercises?.map(item => item?.id)

    // const handleDeleteExercises = async () => {
    //     deleteExercises({ ids: selectedExercisesIds, userId: user?.id });
    //     // dispatch(fetchCategoryCurrent({ categoryId, userId: user.id }));
    // };


    return (
        <main className={classNames("app", cl.CreateExerciseofCategoryPage, {}, [theme])}>
            <section className={cl.createExerciseHeader}>
                {
                    loading ? <Skeleton height='50px' width="150px" />
                        : <h1 className={cl.titleCategory}>{category__current?.title}</h1>
                }
                <Input
                    placeholder='Название упражнения'
                    height='50px'
                    value={exerciseName}
                    onChange={handleOnChange}
                />
                <div>
                    {exerciseName !== "" && (
                        <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={createExerciseOnClick}>
                            Создать упражнение
                        </Button>
                    )}
                </div>
            </section>
            {/* {loading ?
                <h1 className={cl.loading}>Загрузка...</h1>
                :
                <Exercises />
            }
            <div className={cl.menuFooter}>
                <ArrowLeftIcon onClick={handleOnClick} />
                {
                    selectedExercises?.length > 0 &&
                    <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={handleDeleteExercises}>
                        Удалить
                    </Button>
                }
            </div> */}
        </main>
    );
};
