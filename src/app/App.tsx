import { useRef, useState } from 'react'
import './App.css'
import { FactsPage } from '../pages'

/**
 * 1.Приложение должно состоять из нескольких частей: Блок с кнопкой и текстовым полем. По нажатию на кнопку выполнить запрос к https://catfact.ninja/fact. Полученный факт нужно записать в текстовое поле и установить курсор после первого слова.
 * 2.Форма с текстовым полем и кнопкой отправки. Пользователь вводит своё имя в текстовом поле. По истечении 3-х секунд после ввода имени или при отправке формы выполняется запрос к https://api.agify.io/ с введенным именем в параметре пате. Ответом будет возраст человека, определенный по имени. Этот ответ нужно отобразить под текстовым полем.
    Особенности:
    - Необходимо предотвращать дублирующие запросы (не отправлять запрос с таким же именем).
    - Предусмотреть отправку следующего запроса до того, как текущий был обработан - прерывать запрос, чей ответ нам уже не нужен (частый кейс при медленном интернете).
 * Дополнительные задания:
    1. Реализовать валидацию поля ввода имени (имя может состоять только из букв).
    2. Архитектурная методология Feature-Sliced Design
    3. TanStack Query для работы с запросами
    4. Typescript
    5. React Hook Form + Yup для работы с формами и их валидацией
 */


function App() {

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [prevQuery, setPrevQuery] = useState('')
  const timerRef = useRef(0)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    setName(newName)
    // Отменяем предыдущий таймер, если он был установлен
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
    }
    // Устанавливаем новый таймер для отправки запроса через 3 секунды после ввода имени
    timerRef.current = setTimeout(() => {
      fetchAge(newName)
    }, 3000)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    fetchAge(name)
  }

  const fetchAge = async (newName: string) => {
    // Проверяем, не отправляли ли уже запрос с таким именем
    console.log(prevQuery, newName)
    if (newName === prevQuery || newName === '') {
      return
    }
    setPrevQuery(newName)
    try {
      const response = await fetch(`https://api.agify.io/?name=${newName}`)
      if (!response.ok) {
        throw new Error('Failed to fetch age')
      }
      const data = await response.json()
      setAge(data.age)
    } catch (error) {
      console.error('Error fetching age:', error)
    }
  }

  return (
    <>
      <FactsPage />
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Имя:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <button type="submit" disabled={name === ''} >Получить возраст</button>
        </form>
        {age && <div>Возраст: {age}</div>}
      </div>
    </>
  )
}

export default App
