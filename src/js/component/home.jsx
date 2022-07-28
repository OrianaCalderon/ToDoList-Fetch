import React, { useEffect, useState } from "react";



//create your first component
const Home = () => {

	const [task, setTask] = useState(
		{
			label: "",
			done: false
		}
	)
	const [listTask, setListTask] = useState([])

	const urlBase = "https://assets.breatheco.de/apis/fake/todos/user"
	const user = "oriana"

	const handleChange = (event) => {
		setTask({ ...task, [event.target.name]: event.target.value })

	}

	const saveListTask = async (event) => {

		if (event.key === "Enter") {
			if (task.label.trim() !== "") {
				// si es distinto de vacion es xq tiene tarea
				try {
					let response = await fetch(`${urlBase}/${user}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify([...listTask, task])
					})
					if (response.ok) {
						setTask({ label: "", done: false })
						getTodos()
					}

				} catch (error) {
					console.log(error)
				}

			}
		}


	};


	const deleteTask = (id) => {

		let newListTask = listTask.filter((item, index) => {
			return (
				id != index
			)
		})
		setListTask(newListTask)
	}




	const getTodos = async () => {
		try {
			let response = await fetch(`${urlBase}/${user}`)
			let data = await response.json()
			if (response.status !== 404) {
				setListTask(data)

			} else {
				let responseTodos = await fetch(`${urlBase}/${user}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify()

				})


				if (responseTodos.ok) {
					getTodos()
				}
			}

		} catch (error) {
			console.log(`Explote : ${error}`)

		}
	}

	useEffect(() => {
		getTodos()
	}, [])

	return (
		<div className="container">

			<div className="row"> <h1 className="titulo">todos</h1></div>
			<div className="row note">


				<div className="row">
					<div className="col-12 col-md-6 divInput">
						<input className="dato"
							name="label" 
							value={task.label}
							onChange={handleChange} 
							type="text"
							placeholder="What needs to be done?"
							onKeyDown={saveListTask} />
					</div>
				</div>
				<div className="row">
					<div className="col col-12 col-md-6 divUl">
						<ul>
							{listTask.map((item, index) => {
								return (
									<li className="li" key={index} onClick={() => deleteTask(index)} >
										<div className="divLoop d-flex">
											<div className="textoLi">{item.label} </div>
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
