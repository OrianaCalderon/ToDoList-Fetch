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

	const handleTask = (event) => {
		 setTask({...task,[event.target.name]: event.target.value})
		
	}

	const saveListTask =(event)=> {
		// console.log("ori")

	}

	return (
		<div className="container">


			<div className="row d-flex justify-content-center">
				<h1 className="titulo">todos</h1>
				<div className="col-4">
					<input className="input" name="task" value={task.task} 
				onChange={handleTask} type="text" 
				placeholder="What needs to be done?"
				onKeyDown={saveListTask}/>
				</div>
				
			
				
				
			</div>
			


		</div>
	);
};

export default Home;
