const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const categories = ['Premier League','Serie A'];
const connections = [
    {
        id:'1',
        name:'Manchester United',
        topic:'Premier League',
        details:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt metus neque, sodales tincidunt ipsum pellentesque vitae. Phasellus finibus aliquet metus vitae fringilla',
        hostname:'Ole Gunnar Solskjaer',
        location: 'Old Trafford',
        date:'2021-10-16',
        startTime:'10:00',
        image:'https://thumbs.dreamstime.com/z/emblem-football-club-manchester-united-england-isolated-white-background-164815181.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'2',
        name:'Chelsea',
        topic:'Premier League',
        details:'Cras maximus enim eu nunc mattis porttitor. Vivamus luctus enim sed fermentum feugiat. Maecenas fermentum pulvinar arcu nec sollicitudin. Donec faucibus neque sit amet lorem pharetra auctor',
        hostname:'Thomas Tuchel',
        location: 'Stamford Bridge',
        date:'2021-10-17',
        startTime:'11:30',
        image:'https://thumbs.dreamstime.com/z/collection-vector-logos-most-famous-football-teams-world-format-available-ai-illustrator-chelsea-logo-125024362.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'3',
        name:'Liverpool',
        topic:'Premier League',
        details:'Cras vel vulputate nisl, eget aliquet libero. Ut pulvinar lacinia massa quis luctus. Sed nec massa ac leo posuere blandit in sed ante. Donec dictum elit mollis egestas placerat.',
        hostname:'Jurgen Klopp',
        location: 'Anfield',
        date:'2021-10-17',
        startTime:'13:15',
        image:'https://thumbs.dreamstime.com/z/liverpool-f-c-england-feb-vector-illustration-logo-white-background-87584876.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'4',
        name:'Juventus',
        topic:'Serie A',
        details:'Cras nec posuere nisi. Mauris pretium felis turpis, sit amet viverra ligula pellentesque feugiat. Proin venenatis magna quis semper aliquam.',
        hostname:'Max Allegri',
        location: 'Allianz Stadium',
        date:'2021-10-18',
        startTime:'18:00',
        image:'https://thumbs.dreamstime.com/z/juventus-italy-fc-best-vector-illustration-football-club-logo-white-background-juventus-italy-fc-best-vector-illustration-132599440.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'5',
        name:'AS Roma',
        topic:'Serie A',
        details:'Phasellus convallis, metus vitae mollis euismod, purus augue viverra tellus, at fermentum turpis turpis sed ligula. Nullam tempus interdum dolor, eu accumsan ipsum viverra facilisis.',
        hostname:'Jose Mourinho',
        location: 'Stadio Olympicos',
        date:'2021-10-17',
        startTime:'20:15',
        image:'https://thumbs.dreamstime.com/z/collection-vector-logos-most-famous-football-teams-world-format-available-ai-illustrator-as-roma-logo-120474615.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'6',
        name:'Inter Milan',
        topic:'Serie A',
        details:'Ut mattis lacus in nulla elementum, non semper mauris bibendum. In hac habitasse platea dictumst. Quisque ornare justo eget rhoncus feugiat.',
        hostname:'Simeone Inzaghi',
        location: 'San Siro', 
        date:'2021-10-17',
        startTime:'08:15',
        image:'https://thumbs.dreamstime.com/z/logo-italian-football-team-inter-milan-italy-logo-inter-milan-italy-215838601.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.categories = () => categories;

exports.find = () => connections;

exports.findById = id => connections.find(connection => connection.id === id);

exports.save = function (connection) {
    connection.id = uuidv4();
    connection.createdAt=DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    if(categories.indexOf(connection.topic) === -1){
        categories.push(connection.topic);
    }
    connections.push(connection);
};

exports.updateById = function (id, newConnection) {
    let connection = this.findById(id);
    if(connection){
        if(categories.indexOf(newConnection.topic) === -1){
            categories.push(newConnection.topic);
        }
        connection.name = newConnection.name;
        connection.topic = newConnection.topic;
        connection.details = newConnection.details;
        connection.hostname = newConnection.hostname;
        connection.location = newConnection.location;
        connection.date = newConnection.date;
        connection.startTime = newConnection.startTime;
        connection.endTime = newConnection.endTime;
        connection.image = newConnection.image;

        categories.forEach(category => { 
            if(!connections.some(connection => connection.topic === category)){
                let categoryIndex = categories.indexOf(category);
                if(categoryIndex !== -1){
                    categories.splice(categoryIndex, 1);
                }
            }
        }); 
        

        return true;
    }else {
        return false;
    }
};

exports.deleteById = function (id) {
    let index = connections.findIndex(connection => connection.id === id);
    if(index !== -1){
        let deletedConnection = connections.splice(index,1);
        if(!connections.some(connection => connection.topic === deletedConnection[0].topic)){
            let categoryIndex = categories.indexOf(deletedConnection[0].topic);
            if(categoryIndex !== -1){
                categories.splice(categoryIndex, 1);
            }
        }
        return true;
    }else {
        return false;
    }
};  