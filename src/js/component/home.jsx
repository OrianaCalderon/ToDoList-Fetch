import React , {useState} from "react";


//include images into your bundle


//create your first component
const Home = () => {

	const [task,setTask] = useState (
		{ task: "",
		isDone: false
		}
	)
	const [listTask, setListTask] = useState ([])

	const handleChange = (event) => {
		 setTask({...task,[event.target.name]: event.target.value})
		
	}

	const saveListTask =(event)=> {
		 
		 if (event.key === "Enter"){
			setListTask([...listTask, task])
			setTask({task:"", isDone:false})
		 }

	}

	const deleteTask =(id)=>{
		
		let newListTask = listTask.filter((item,index)=>{
			return (
				id != index 
			)
		})
        setListTask(newListTask)
	}

	return (
		<div className="container">
			
			<div className="row"> <h1 className="titulo">todos</h1></div>
			<div className="row note">
				
				
			    <div className="row">
				    <div className="col-12 col-md-6 divInput">
					    <input className="input" 
					    name="task" value={task.task} 
				     onChange={handleChange} type="text" 
				     placeholder="What needs to be done?"
				     onKeyDown={saveListTask}/>
				    </div>	
			    </div>
			    <div className="row">
				    <div className="col col-12 col-md-6 divUl">
					    <ul>
							    {listTask.map((item,index)=>{
								    return(
									<li className="li" key={index} onClick={()=>deleteTask(index)} >
										<div className="divLoop d-flex">
											<div className="textoLi">{item.task} </div> 
										    <div className="iconoLi"><i className="fas fa-times"></i></div> 
										</div>
									</li>
								    )
							    })}
					    </ul>	
					<p className="botton">{listTask.length}  item left</p>
				    </div>
					
			    </div>
                
			</div>
			


		</div>
	);
};

export default Home;
