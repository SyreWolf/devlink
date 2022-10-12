const initData = {
	id: 'test_board',
	name: 'New Features',
	columnOrder: ['backlog', 'in_progress', 'testing', 'completed'],
	users: {
		'user-1': { id: 'user-1', name: 'Issachar Palmer', email: 'issachar.palmer@work.com', img: '/issachar.jpg' },
		'user-2': { id: 'user-2', name: 'Aldona Gus', email: 'aldona.gus@work.com', img: '/aldona.jpg' },
		'user-3': { id: 'user-3', name: 'Gael Erma', email: 'gael.erma@work.com', img: '/gael.jpg' },
		'user-4': { id: 'user-4', name: 'Beatrix Shannon', email: 'beatrix.shannon@work.com', img: '/beatrix.jpg' },
	},
	tags: {
		testing: { id: 'testing', name: 'Testing', color: '#4ade80' },
		design: { id: 'design', name: 'Design', color: '#14b8a6' },
		management: { id: 'management', name: 'Management', color: '#8b5cf6' },
		rrhh: { id: 'rrhh', name: 'RRHH', color: '#ec4899' },
		customer_service: { id: 'customer_service', name: 'Customer Service', color: '#fcd34d' },
	},
	tasks: {
		'task-1': { 
			id: 'task-1',
			content: 'Lorem ipsum dolor sit amet',
			description: 'Consectetur adipiscing elit nulla ut ante a magna elementum feugiat', 
			finished: false, 
			members: ['user-1'], 
			requirements: [
				{ id: 'req_1', name: 'Nam ex elit, blandit sit amet libero eu, feugiat rutrum lectus.' },
				{ id: 'req_2', name: 'Nunc feugiat ultricies ex, in faucibus quam congue sit amet. Suspendisse fermentum vestibulum dapibus.' },
				{ id: 'req_3', name: 'Proin in sem in mi scelerisque feugiat.' },
				{ id: 'req_4', name: 'In vestibulum ligula mauris, sed commodo dolor sagittis quis.' },
				{ id: 'req_5', name: 'Vestibulum eget enim nibh.' }
			], 
			deadline: '2022-10-10',
			tags: ['testing', 'design', 'management', 'rrhh', 'customer_service']
		},
		'task-2': { 
			id: 'task-2',
			content: 'Suspendisse sit amet nisi a elit euismod fermentum',
			description: 'Donec efficitur sem auctor orci molestie rhoncus', 
			finished: false, 
			members: ['user-1', 'user-2', 'user-3', 'user-4'], 
			requirements: [], 
			deadline: '',
			tags: []
		},
		'task-3': { 
			id: 'task-3',
			content: 'Nullam et felis',
			description: 'Eu nibh hendrerit tempus eget rutrum elit. Proin ac ligula non sem tristique eleifend sit amet ac ex.', 
			finished: false, 
			members: [], 
			requirements: [
			 	{ id: 'req_1', name: 'Mauris at ullamcorper metus.' },
			 	{ id: 'req_2', name: 'Aliquam feugiat lobortis turpis, ut tempor nisl consequat vitae. Donec est diam, bibendum in velit at, volutpat egestas est. Duis lacinia vitae mauris eu scelerisque.' },
			 	{ id: 'req_3', name: 'Suspendisse commodo massa vitae lorem malesuada, eget maximus odio rutrum.' },
			 	{ id: 'req_4', name: 'Sed blandit nunc vehicula, gravida sem a, dictum lorem. Etiam dignissim porta facilisis. Donec diam sapien, blandit et nulla porta, porta facilisis elit.' },
			],  
			deadline: '2022-07-31',
			tags: ['testing', 'management', 'rrhh']
		},
		'task-4': { 
			id: 'task-4',
			content: 'Nam risus nunc',
			description: 'Sodales at neque eu, venenatis scelerisque massa. Cras molestie convallis lobortis. Duis dictum orci vitae magna placerat, sit amet gravida mauris vestibulum.', 
			finished: false, 
			members: ['user-2', 'user-3', 'user-4'], 
			requirements: [
			 	{ id: 'req_1', name: 'Nunc luctus orci sed eros porta, quis faucibus est eleifend.' },
			 	{ id: 'req_2', name: 'In in mauris id lacus ultricies tempor.' },
			], 
			deadline: '',
			tags: ['rrhh', 'customer_service']
		},
		'task-5': { 
			id: 'task-5',
			content: 'Nullam pharetra porta dapibus',
			description: '', 
			finished: false, 
			members: [], 
			requirements: [],  
			deadline: '2022-08-10',
			tags: ['customer_service'] 
		}
	},
	columns: {
		'backlog': { 
			id: 'backlog', 
			title: 'Backlog', 
			taskIds: ['task-5', 'task-1'] 
		},
		'in_progress': { 
			id: 'in_progress', 
			title: 'In progress', 
			taskIds: ['task-3', 'task-4'] 
		},
		'testing': { 
			id: 'testing', 
			title: 'Testing', 
			taskIds: ['task-2'] 
		},
		'completed': { 
			id: 'completed', 
			title: 'Completed', 
			taskIds: [] 
		}
	},
};

export default initData;