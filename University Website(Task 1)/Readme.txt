University Website: 

Database: {
	1. Create a database in MongoDB or any other NoSQL database named "University_website".
	2. Create 6 tables/collections with the names of courses, events, messages, notices, students and users.
	3. Now add all the data of tables/collections from the "db" folder to the database.
},

Dashboard:{

	Commands:{
		1. npm install
		2. npm run dev (For development/testing)
		3. npm start (For production)
	},


	Admin: {
		Admin Data: {
			Email: hammad@gmail.com
			Password: 123456
		},


		Admin Can Do: {
			1. Admin can only add and delete faculties.
			2. Admin can only assign a faculty member as an admin or admin as an faculty.
			4. Admin can only add and delete students.
			5. Admin can also assign design a courses to students.
			4. Admin can only delete messages that come from the client side.
			6. Admin can only add and delete courses to faculty.
			7. Admin can also add and delete notices (Admin can delete anyone notices).
			8. Admin can only add and delete events.
		}
	},
	

	Faculties: {
		
		Faculties Data: {
			Email: {
				1. rimsha@gmail.com
				2. ali@gmail.com
				3. warda@gmail.com
				4. shehryar@gmail.com
				5. mubashir@gmail.com
				6. waqas@gmail.com
				7. fatima@gmail.com
				8. taha@gmail.com
			},

			Password: {
				(All Faculties have same password)
				Password: 123456
			}
			
		},


		Faculties Can Do: {
			1. Faculty member can view their own details.
			2. Faculty member can view other faculty members' details.
			3. Faculty member can view all students details.
			4. Faculty member can also assign and design a courses to students.
			5. Faculty member can only view messages that come from the client side.
			6. Faculty member can view all courses.
			7. Faculty member can view all notices.
			8. Faculty member can add and delete their own notices.
			9. Faculty member can view all events.
		}

	}

},


Client: {

	Commands:{
		1. npm install
		2. npm run dev (For development/testing)
		3. npm run build (For production)
		4. npm run preview (For serve the site on production)
	},


	Clients/students can view: {
			1. Clients/students can send message to admin.
			2. Clients/students can view all courses. 
			3. Clients/students can view all notices.
			4. Clients/students can view all events.
			5. Students can only login with their university-issued accounts and see their enrolled courses and account activity.
	},

	
	Student Data: {
		Emails: {
			1. hansraj@gmail.com
			2. rafique@gmail.com
			3. shahwaiz@gmail.com
			4. hashir@gmail.com
			5. somnath@gmail.com
			6. yaseen@gmail.com
			7. anas@gmail.com 
			8. moiz@gmail.com
		},
		
		Password: {
				(All students have same password)
				Password: 123456
			}
	}
}
