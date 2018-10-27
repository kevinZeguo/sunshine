//enable datepicker
function pickDate(cellvalue, options, cell,fmt) {
    setTimeout(function () {
        if(fmt == null || fmt == "" || undefined == fmt){
            fmt = "yyyy-mm-dd";
        }
        $(cell).find('input[type=text]').datepicker({format: fmt, autoclose: true});
    }, 0);
}

