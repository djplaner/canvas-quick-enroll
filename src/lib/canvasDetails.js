
/**
 * Fetch function for retrieving information from a single endpoint request
 * @param {String} reqUrl Endpoint URL to query the Canvas API
 * @returns Response Object
 */
const wf_fetchData = async (reqUrl) => {
	const url = reqUrl;
	try {
		const res = await fetch(url);
		if (res.status === 404) // Endpoint not found
			return null;
		if (res.status === 401) // User not authorized
			return null;
		const json = await res.json();
		return json;
	} catch (e) {
		console.error(`Could not fetch requested information: ${e}`);
	}
};

const wf_deleteData = async (reqUrl, csrf) => {
	const url = reqUrl;
	try {
		const res = await fetch(url, {
			method: 'DELETE', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": csrf
			}
		});
		if (res.status === 404) // Endpoint not found
			return null;
		if (res.status === 401) // User not authorized
			return null;
		const json = await res.json();
		return json;
	} catch (e) {
		console.error(`Could not delete requested information: ${e}`);
	}
}



const wf_postData = async (reqUrl, data, csrf) => {
	const url = reqUrl;
	try {
		const res = await fetch(reqUrl, {
			method: 'POST', credentials: 'include',
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-CSRF-Token": csrf
			},
			body: JSON.stringify(data),
		});
		if (res.status === 404) // Endpoint not found
			return null;
		if (res.status === 401) // User not authorized
			return null;
		const json = await res.json();
		return json;
	} catch (e) {
		console.error(`Could not post requested information: ${e}`);
	}
}

/**
 * Fetch function for retrieving information from multiple endpoint requests
 * @param {Array} reqData Array of endpoint URL's to query the Canvas API
 * @returns Array of Response Objects
 */
const wf_fetchDataMulti = async (reqData) => {
	return Promise.all(reqData.map(async (data) => {
		try {
			const res = await fetch(data);
			if (res.status === 404) // Endpoint not found
				return null;
			if (res.status === 401) // User not authorized
				return null;
			const json = await res.json();
			return json;
		} catch (e) {
			console.error(`Could not fetch requested information: ${e}`);
		}
	}));
};

export class canvasDetails {

	/**
	 * Set up the object and request from Canvas details on the user and their current enrollments
	 * @callBack finishedCallBack - function to change the state of the parent component 
	 * @param {Object} config - configuration object
	 */
	constructor(finishedCallBack, config) {
		this.finishedCallBack = finishedCallBack;
		this.CONFIG = config;
		this.csrf = this.getCsrfToken();

		this.currentHostName = document.location.hostname;
		this.baseApiUrl = `https://${this.currentHostName}/api/v1/courses/`;
		this.courseId = window.location.href.split("/")[window.location.href.split("/").indexOf("courses") + 1];
		// convert courseId to integer
		this.courseId = parseInt(this.courseId);

		this.getCanvasUser();
	}

	/**
	 * Ask Canvas for the user's current object and return it
	 */

	getCanvasUser() {
		wf_fetchData(`https://${this.currentHostName}/api/v1/users/self`).then((data) => {
			this.user = data;
			this.getUsersEnrollments();
		});
	}

	getUsersEnrollments() {
		// old get courses
		//wf_fetchData(`https://${this.currentHostName}/api/v1/users/self/courses?per_page=100`).then((data) => {
		wf_fetchData(`https://${this.currentHostName}/api/v1/users/self/enrollments?type[]=DesignerEnrollment&per_page=100`).then((data) => {
			if (data===null) {
				return;
			}
			this.enrollments = data;
			this.finishedCallBack();
		});
	}

	/**
	 * return the current status of the user's enrolment in current course
	 *   true iff one of the objects in courses array has this.courseId as the id attribute
	 */
	getEnrollmentStatus() {
		// find how many objects in this.enrollments array have id===this.courseId
		const numMatchingEnrollments = this.enrollments.filter((enrollment) => enrollment.course_id === this.courseId).length;
		//return numMatchingEnrollments === 1;
		const object = this.getCourseEnrollementObject(this.courseId);
		console.log(`-------------getEnrollmentStatus -- ${numMatchingEnrollments}`);
		console.log(object);
		return object !== undefined;
	}

	/**
	 * Return the enrollment object from this.enrollments matching the given courseId, 
	 * else undefined
	 * @param {*} courseId 
	 */
	getCourseEnrollementObject(courseId) {
		// return the first object in this.enrollments array with course_id===courseId
		return this.enrollments.find((enrollment) => enrollment.course_id === courseId);
	}

	/**
	 * Enrol the user in the current Canvas course
	 */

	enrollUser() {
		// can we find the proper section to enroll the user in
		wf_fetchData(
			`https://${this.currentHostName}/api/v1/courses/${this.courseId}/sections`
		).then((sectionsData) => {
			if (sectionsData === null) {
				return;
			}

			// sections is an array of objects
			const sections = sectionsData;
			let sectionId = null;
			if (sections.length > 0) {
				sectionId = sections[0].id;
			} else {
				alert("The current course has no sections. At least one section is required for quick enrol to work.")
				return;
			}
			// search all the sections for one with a name that matches the regex in this.CONFIG.sectionName
			// if found, set sectionId to that section's id
			sections.forEach((section) => {
				if (section.name.match(this.CONFIG.sectionName)) {
					sectionId = section.id;
				}
			});
			// Have the section id, time to enroll the user in that section
			const data = {
				"enrollment": {
					"user_id": this.user.id,
					"type": "DesignerEnrollment",
					"enrollment_state": "active"
				}
			};
			wf_postData(
				//`https://${this.currentHostName}/api/v1/courses/${this.courseId}/enrollments`,
				`https://${this.currentHostName}/api/v1/sections/${sectionId}/enrollments`,
				data, this.csrf
			).then((response) => {
				// TODO should handle the response better than this
				if (response === null) {
					return;
				}
				this.getUsersEnrollments();
			});
		});



	}

	/**
	 * Unenrol the user from the current Canvas course
	 */

	unEnrollUser() {
		const enrollment = this.getCourseEnrollementObject(this.courseId);

		if (enrollment === undefined) {
			console.error(`Could not find enrollment object for course ${this.courseId}`);
			return;
		}

		wf_deleteData(
			`https://${this.currentHostName}/api/v1/courses/${this.courseId}/enrollments/${enrollment.id}?task=delete`,
			this.csrf
		).then((response) => {
			// TODO should handle the response better than this
			this.getUsersEnrollments();
		});
	}

	/**
	 * Following adapted from https://github.com/msdlt/canvas-where-am-I
	 * Function which returns csrf_token from cookie see: 
	 * https://community.canvaslms.com/thread/22500-mobile-javascript-development
	 */
	getCsrfToken() {
		let csrfRegex = new RegExp('^_csrf_token=(.*)$');
		let cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			let match = csrfRegex.exec(cookie);
			if (match) {
				return decodeURIComponent(match[1]);
			}
		}
		return null;
	}
}