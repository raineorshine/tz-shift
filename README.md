Shift the timezone of a list of times.

```
$ npm install -g tz-shift
```

```
$ cat input.txt
Tue 9/26 8-11am, 2-7pm
Wed 9/27 8-11am, 2-5pm
Thu 9/28 2-3pm, 5-8pm
Fri 9/29 8-11am, 2-4pm
Sat 9/30 11am-1pm
Sun 10/1 10am-12pm

$ tz-shift E < input.txt
Tue 9/26 10am-1pm, 4-9pm EDT
Wed 9/27 10am-1pm, 4-7pm EDT
Thu 9/28 4-5pm, 7-10pm EDT
Fri 9/29 10am-1pm, 4-6pm EDT
Sat 9/30 1-3pm EDT
Sun 10/1 12-2pm EDT
```
