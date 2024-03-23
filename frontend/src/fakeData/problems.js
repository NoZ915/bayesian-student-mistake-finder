const problems = [
    {
        problemNumber: 1,
        description: "Rice _______ the radio every night.",
        options: [
            {   
                name: "A",
                text: "listen to",
                errorType: 4
            },
            {   
                name: "B",
                text: "listened to",
                errorType: 1
            },
            {   
                name: "C",
                text: "is listening",
                errorType: 4
            },
            {   
                name: "D",
                text: "listens to",
                errorType: 0
            }
        ]
    },
    {
        problemNumber: 2,
        description: "My sister _______ TV every day.",
        options: [
            {   
                name: "A",
                text: "watch",
                errorType: 4
            },
            {   
                name: "B",
                text: "watchs",
                errorType: 2
            },
            {   
                name: "C",
                text: "is watching",
                errorType: 1
            },
            {   
                name: "D",
                text: "watches",
                errorType: 0
            }
        ]
    }
];

export default problems;