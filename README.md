# analog-counter-wheel

This is a proof of concept element, inspired by the UIKit [PickerView](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UIPickerView.html)
It is mainly designed to be a display read-only kind of component, but it also could be used as input using the mouse-wheel. Direct manipulation by touch or mouse drag are not present at the moment.


To create a analog-counter-wheel component you just need a div 

`var myComponent = new Counter(myDiv);`

This will instantiate a new component and initialize it.

##Public API


`Counter.pos;`
> Current Position

`Counter.values = [0,1,2,3,4,5,6,7,8,9];`
> Array of the possible values


### Options

`Counter.options.mousewheel`
> [boolean] enable mouse wheel manipulation

`Counter.options.digitHeight`
> [Integer] height in pixels of a single digit

`Counter.options.inverted`
> [boolean] invert direction

### Methods

Counter.prototype.setValue(value)
> Set the position to the position of the value

Counter.prototype.getValue()
> returns the value of the current position

Counter.prototype.setValue(value)
> Set the position to the position of the value

Counter.prototype.getPos()
> returns the current index position

Counter.prototype.setPos (index)
> Set the position to the specified index

Counter.prototype.moveBy(x)
> Move by the specified amount (positive or negative)

Counter.prototype.moveTo(pos)
> Move to the specified index position

Counter.prototype.next()
> Increase the position by one

Counter.prototype.previous(pos)
> Reduce the position by 1
