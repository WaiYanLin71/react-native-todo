import { useState } from "react"


const useTodo = () => {
    const [todo, dispatch] = useState('');
    
    return [todo, todo]
}

export default useTodo