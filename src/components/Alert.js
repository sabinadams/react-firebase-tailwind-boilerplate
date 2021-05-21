import { useRef, useState, forwardRef, useImperativeHandle } from 'react'

const Alert = forwardRef((props, ref) => {
    const [message, setMessage ] = useState('')
    const alertRef = useRef()
    const types = {
        error: 'red',
        success: 'green',
        info: 'blue'
    }
    
    useImperativeHandle( ref, () => ({
        newAlert(message) {
            setMessage(message)
            alertRef.current.classList.remove('animate-fadeout')
            alertRef.current.classList.remove('invisible')
            setTimeout(() => {
                if ( !alertRef.current ) return
                alertRef.current.classList.add('animate-fadeout')
            }, 3000)
        }
    }))

    return (
        <div 
            style={{ animationFillMode: 'forwards' }}
            className={`rounded w-full bg-${types[props.type || 'info']}-200 text-center absolute invisible`} 
            ref={alertRef}
        >
            <p className="text-white text-sm px-4 py-2">{message}</p>
        </div>
    )
})

export default Alert