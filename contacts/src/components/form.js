import React , {useReducer} from 'react'
import styles from './form.module.css';

const INITAL_STATE = {
    name:' ',
    email:'',
    subject:'',
    body:'',
    status: 'IDLE',
 };

 const reducer = (state,action)=>{
     switch(action.type){
         case 'updateFieldValue':
             return {...state , [action.field]: action.value};
        
        case 'updateStatus':
            return {...state , status: action.status};

        case 'reset':
        default:
             return INITAL_STATE;
     }
 };

const Form =() =>{
    const [state, dispatch] = useReducer(reducer,INITAL_STATE);

    const setStatus = status => dispatch({
        type : 'updateStatus',
        status
    })

    const updateFieldValue = field => event => {
        dispatch(
            {
                type: 'updateFieldValue',
                field,
                value: event.target.value,
            }
        )

    }

    const handleSubmit = event =>{
        event.preventDefault();
        setStatus('PENDING');
       
        fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(state),
        })

        .then(response=>response.json())
        .then(response=>{
            console.log(response);
            setStatus('SUCCESS')
        })
        .catch(error =>{
            console.error(error);
            setStatus('ERROR')
        });
    };

    if(state.status === 'SUCCESS'){
        return(
            <p className={styles.success}>
                Message sent !
                <button
                type="reset"
                onClick={()=>dispatch({type:'reset'})}
                className={`${styles.button} ${styles.centered}`}
                >
                Reset
                </button>
            </p>

        )
    }

    return(
        <>
            {state.status ==='ERROR' && (
                <p className={styles.error}> Something went wrong ! please try again</p>
            )}
        <form className={`${styles.form} ${state.status==='PENDING' && styles.pending}`} onSubmit={handleSubmit}>
            
            <label className={styles.label}>
                Name
            </label>
            <input 
            className={styles.input} 
            type="text" 
            name="name"
            value={state.name}
            onChange={updateFieldValue('name')}
            >

            </input>
           
            <label className={styles.label}>
                Email
            </label>
            <input 
            className={styles.input} 
            type="email" 
            name="name"
            value={state.email}
            onChange={updateFieldValue('email')}
            ></input>
           
            <label className={styles.label}>
                Subject
            </label>
            <input 
            className={styles.input} 
            type="text" 
            name="name"
            value={state.subject}
            onChange={updateFieldValue('subject')}
            ></input>
            
            <label className={styles.label}>
                Body
            </label>
            <textarea className={styles.input}name="name" value={state.body}  onChange={updateFieldValue('body')}></textarea>
            <button className={styles.button}>Send</button>
        </form>
        </>
    )
}

export default Form;