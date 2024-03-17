import './App.css'
import { AgePage, FactsPage } from '../pages'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

/** 
 * 1.Приложение должно состоять из нескольких частей: Блок с кнопкой и текстовым полем. По нажатию на кнопку выполнить запрос к https://catfact.ninja/fact. Полученный факт нужно записать в текстовое поле и установить курсор после первого слова.
 * 2.Форма с текстовым полем и кнопкой отправки. Пользователь вводит своё имя в текстовом поле. По истечении 3-х секунд после ввода имени или при отправке формы выполняется запрос к https://api.agify.io/ с введенным именем в параметре пате. Ответом будет возраст человека, определенный по имени. Этот ответ нужно отобразить под текстовым полем.
    Особенности:
    - Необходимо предотвращать дублирующие запросы (не отправлять запрос с таким же именем).
    - Предусмотреть отправку следующего запроса до того, как текущий был обработан - прерывать запрос, чей ответ нам уже не нужен (частый кейс при медленном интернете).
 * Дополнительные задания:
    1. Реализовать валидацию поля ввода имени (имя может состоять только из букв). +
    2. Архитектурная методология Feature-Sliced Design +
    3. TanStack Query для работы с запросами +
    4. Typescript +
    5. React Hook Form + Yup для работы с формами и их валидацией -

    Стили никакие не применял, роутер не сдал подключать
 */
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FactsPage />
      <AgePage />
    </QueryClientProvider>
  )
}


export default App
