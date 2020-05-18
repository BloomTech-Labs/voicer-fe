import React, { useState } from 'react'
import { axiosWithAuth } from '../axiosWithAuth/axiosWithAuth'
import { useInputControl } from '../../hooks/useInputControl'
import { Button, Card, InputGroup, FormControl, FormGroup, Col, FormText, FormLabel } from "react-bootstrap"

const ReactUploadMedia = () => {

	const [media, setMedia] = useState({
		file: null
	})
	const titleInput = useInputControl('')
	const descriptionInput = useInputControl('')

	const doSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData()
		formData.append('file', media)
		formData.append('title', "")
		formData.append('description', "")
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		axiosWithAuth()
		.post("/api/voice", formData, config)
			.then(res => {
				alert("File successfully uploaded")
			})
			.catch(err => {
				return err
			})
	}

	const onChange = (e) => {
		setMedia({file:e.target.files[0]})
	}

	return (
		<section>
			<form onSubmit={doSubmit}>
				<Card.Header>
					<Card.Title>Voice sample upload</Card.Title>
				</Card.Header>

				<Card.Body>
					<FormGroup row>
						<FormLabel for="exampleFile" sm={2}>File</FormLabel>
						<Col sm={10}>
							<FormText color="muted">
								<input type="file" name="file" onChange={onChange} />
								<RegFields
									titleInput={titleInput}
									descriptionInput={descriptionInput}
								/>
							</FormText>
						</Col>
					</FormGroup>
				</Card.Body>

				<Card.Footer>
					<Button
						variate="primary"
						type="submit"
						style={{ width: "10rem", margin: "0 0 1.75rem" }}
					>Upload
					</Button>
				</Card.Footer>
			</form>
		</section>
	)
}

function RegFields(props) {
	  return (
		<>
		  <InputGroup className="mb-3">
			<FormControl {...props.titleInput} placeholder="Title" />
		  </InputGroup>
		  <InputGroup className="mb-3">
			<FormControl {...props.descriptionInput} placeholder="Description" />
		  </InputGroup>
		</>
	  )
}

export default ReactUploadMedia