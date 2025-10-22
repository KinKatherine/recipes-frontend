import Recipe from '../../components/Recipe/Recipe'
import styles from './RecipePage.module.scss'

import imageCupcakes from '../../assets/fake-recipes-images/cupcakes.svg'

const RecipeData = 
  {
    id: 1, 
    title: 'Кексы с кабачком', 
    authorUsername: 'kinkate', 
    image: imageCupcakes,
    description: 'Кексы с кабачком в духовке', 
    instruction: 'Натрите кабачок на терке и отожмите. Взболтайте 1 крупное яйцо с сахаром, оливковым маслом и ванильным экстрактом. В отдельной миске смешайте муку, соль, разрыхлитель и соду. Соедините все ингредиенты, добавьте тертый кабачок, цедру и сок лимона. Перемешайте. Разложите тесто по бумажным капсулам в форме для кексов (смажьте их). Выпекайте около 20-25 минут при 180°C. Проверьте зубочисткой – она должна выходить без следов теста.', // из раздела "Приготовление"
    cookingTime: 90, 
    countOfServings: 4, 
    averageRating: 3, 
    commentsCount: 59, 
    ratingCount: 1000,
    categoryId: null, 
    categoryName: 'десерт', 
    isFavourite: false, 
    userRating: 0,
    ingredientDTOs: [ 
      {id: 101, name: 'Кабачок', amount: 170.0, stringUnit: 'г'},
      {id: 102, name: 'Лимон', amount: 1.0, stringUnit: 'шт.'},
      {id: 103, name: 'Коричневый сахар', amount: 160.0, stringUnit: 'г'},
      {id: 104, name: 'Оливковое масло', amount: 125.0, stringUnit: 'мл.'},
      {id: 105, name: 'Ванильный экстракт', amount: 1.0, stringUnit: 'ч.л.'},
      {id: 106, name: 'Крупное яйцо', amount: 1.0, stringUnit: 'шт.'},
      {id: 107, name: 'Мука', amount: 130.0, stringUnit: 'г'},
      {id: 108, name: 'Соль', amount: 0.25, stringUnit: 'ч.л.'},
      {id: 109, name: 'Разрыхлитель', amount: 0.75, stringUnit: 'ч.л.'},
      {id: 110, name: 'Сода', amount: 0.25, stringUnit: 'ч.л.'}, 
    ],
    commentDTOs: [ 
        {id: 201, commentText: 'ммм балдеж', createdAt: null, authorId: null, authorUsername: 'Светлана'},
        {id: 202, commentText: 'Сегодня мы будем готовить мои любимые фритатататататато для этого мне понадобятся мои любимые помидорки мой любимый перчик и мои любимые яйца а где яйца инвалид где мои яйца м где мои яйца где мои яйца всё есть где мои яйца где мои яйца', createdAt: null, authorId: null, authorUsername: 'Шеф'},
    ]
  }

const RecipePage = () => {
  return (
    <div className={styles.page}>
      <Recipe recipe={RecipeData}/>
    </div>
  )
}

export default RecipePage