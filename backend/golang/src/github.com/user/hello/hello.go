// package main

// import (
// 	"fmt"

// 	"github.com/user/stringutil"
// )

// func main() {
// 	fmt.Printf(stringutil.Reverse("!olleH"))
// }

package main

import (
	"fmt"
	"strconv"
)

func main() {
	var msgid float64 = 12344444444444;
	msg := strconv.FormatFloat(msgid, 'f', 0, 64);
	fmt.Println(msgid);
	fmt.Println(msg);
}