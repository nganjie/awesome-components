import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator(main:string,confirm:string):ValidatorFn{
    return (ctrl:AbstractControl):null|ValidationErrors=>{
        if(!ctrl.get(main)||!ctrl.get(confirm))
        {
            return{
                confirmEqual:'invalid control names'
            }
        }
        const mainValue=ctrl.get(main)!.value;
        const confirmValue =ctrl.get(confirm)!.value
       // console.log(mainValue)
        //console.log(confirmValue)
         return  mainValue===confirmValue ?null:{
            confirmEqual:{
                main:mainValue,
                confirm:confirmValue
            }
        }

    };
}