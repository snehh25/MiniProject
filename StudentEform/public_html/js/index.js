var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var empDBName = "STUDENT-TABLE";
var empRelationName = "STUDENT-DB";
var connToken = "90938188|-31949272995162797|90955136";
$('#rollno').focus();

function saveData() {
    var jsonobj = validateData();
    if (jsonobj === '') {
        return '';
    }
    var putreq = createPUTRequest(connToken, jsonobj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
    var resobj = executeCommandAtGivenBaseUrl(putreq, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    ResetForm();
    alert("Saved the Details Successfully")
    $('#rollno').focus();
}
function UpdateData() {
    $("#update").prop('disabled', true);
    $('#save').prop('disabled', false);
    jsonChng = validateData();
    var updatereq = createUPDATERequest(connToken, jsonChng, empDBName, empRelationName, localStorage.getItem('rec_no'));
    jQuery.ajaxSetup({async: false});
    var resobjj = executeCommandAtBaseUrl(updatereq, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resobjj);

    ResetForm();
    $('#rollno').focus();
}
function ResetForm() {
    $('#rollno').val('');
    $('#fullname').val('');
    $('#stuclass').val('');
    $('#bdate').val('');
    $('#address').val('');
    $('#edate').val('');
    $('#rollno').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#update').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#fullname').prop("disabled", true);
    $('#stuclass').prop("disabled", true);
    $('#bdate').prop("disabled", true);
    $('#address').prop("disabled", true);
    $('#edate').prop("disabled", true);
    $('#rollno').focus();
    


}
function validateData() {
    var rollno, fullname, bdate, stuclass, address, edate;
    rollno = $('#rollno').val();
    fullname = $('#fullname').val();
    bdate = $('#bdate').val();
    stuclass = $('#stuclass').val();
    address = $('#address').val();
    edate = $('#edate').val();
    if (rollno === '') {
        alert("Enter the ID");
        $('#empid').focus();
        return '';
    }
    if (fullname === '') {
        alert("Enter the Full-Name");
        $('#fullname').focus();
        return '';
    }
    if (bdate === '') {
        alert("Enter the Birth-Date");
        $('#bdate').focus();
        return '';
    }
    if (stuclass === '') {
        alert("Enter the Class");
        $('#stuclass').focus();
        return '';
    }
    if (address === '') {
        alert("Enter the Address");
        $('#address').focus();
        return '';
    }
    if (edate === '') {
        alert("Enter the Enrollment-Date");
        $('#edate').focus();
        return '';
    }
    var jsonObj = {
        rollno: rollno,
        fullname: fullname,
        bdate: bdate,
        stuclass: stuclass,
        address: address,
        edate: edate
    };
    return JSON.stringify(jsonObj);


}
function getStudent() {
    var stuidjson = getStuIdAsJsonObj();
    var getreq = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, stuidjson);
    jQuery.ajaxSetup({async: false});
    var resobj = executeCommandAtGivenBaseUrl(getreq, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resobj.status === 400) {
        $('#save').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#fullname').focus();
    } else if (resobj.status === 200) {
        $('#rollno').prop('disabled', true);
        fillData(resobj);
        $('#update').prop('disabled', false);
        $('#save').prop('disabled', true);
        $('#reset').prop('disabled', false);
        $('#rollno').focus();
    }

}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $('#fullname').val(data.fullname);
    $('#stuclass').val(data.stuclass);
    $('#bdate').val(data.bdate);
    $('#address').val(data.address);
    $('#edate').val(data.edate);

}
function saveRecNo2LS(jsonObj) {
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', data.rec_no);
}
function getStuIdAsJsonObj() {
    var rollno = $('#rollno').val();
    var jsonStr = {
        rollno: rollno
    };
    $('#fullname').prop("disabled", false);
    $('#stuclass').prop("disabled", false);
    $('#bdate').prop("disabled", false);
    $('#address').prop("disabled", false);
    $('#edate').prop("disabled", false);
    $('#fullname').focus();
    return JSON.stringify(jsonStr);
}


