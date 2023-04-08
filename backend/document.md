### Duties Path

#### get duties

```
# getting duties
method: get
path: "/api/duties/"
body :[
  { userId: 1,
    shiftId: 2,
    jobId: 1,
    clockin: 12/01/2023 7:00am,
    clockout: 12/01/2023 7:00pm,
    break_time: 12/01/2023 12:00pm,
    break_resume: 12/01/2023 1:00pm,
  },
  { userId: 2,
    shiftId: 4,
    jobId: 3,
    clockin: 13/01/2023 7:00am,
    clockout: 13/01/2023 7:00pm,
    break_time: 13/01/2023 12:00pm,
    break_resume: 13/01/2023 1:00pm,
  },
]
```

#### update duties
path: "/api/duties/:id/:jobId/:shiftId"
method: patch
body: { 
  userId: 1,
  shiftId: 2,
  jobId: 1,
  clockin: 12/01/2023 7:00am,
  clockout: 12/01/2023 7:00pm,
  break_time: 12/01/2023 12:00pm,
  break_resume: 12/01/2023 1:00pm,
},

#### get all duties for a particular user
path: "/api/duties/users/:id"
method: get
body: { 
  userId: 1,
  shiftId: 2,
  jobId: 1,
  clockin: 12/01/2023 7:00am,
  clockout: 12/01/2023 7:00pm,
  break_time: 12/01/2023 12:00pm,
  break_resume: 12/01/2023 1:00pm,
},

