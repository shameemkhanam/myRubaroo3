import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { fileHandle } from 'src/app/model/datatypes';
import { AllQuestionsService } from 'src/app/myServices/all-questions.service';
import { SaveAuditService } from 'src/app/myServices/save-audit.service';

@Component({
  selector: 'app-add-edit-questions-dialog',
  templateUrl: './add-edit-questions-dialog.component.html',
  styleUrls: ['./add-edit-questions-dialog.component.scss'],
})
export class AddEditQuestionsDialogComponent implements OnInit {
  gifPreview: any = [];
  imageOrGIf = [];
  imageOrGIfFile:any;
  public imagePrieview = [];
  public editFlag = false;
  public uploadImage: any;
  questionId: string;
  uploadedFileArray=[];
  optionsArray=[];

  attachmentType: any = [
    { id: 1, name: 'none' },
    { id: 2, name: 'Gif' },
    { id: 3, name: 'Video' },
    { id: 4, name: 'Image' },
  ];


  allAnswerTypes: any = [];
  allActivePharma: any = [];

  selectedAnswerType: boolean;
  attachTypeVideo: boolean;
  attachTypeImgGif: boolean;

  brandMessageFormGroup: FormGroup;
  optionsFormGroup: FormGroup;
  urls: any[];

  constructor(
    private _allQuestionsService: AllQuestionsService,
    private fb: FormBuilder,
    private _auditService: SaveAuditService,
    private sanitizer: DomSanitizer,
    private _toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<AddEditQuestionsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.getAllAnswerTypes();
    this.getAllActivePharma();
    this.formInit();

    this.editQuestion();
   
    
  }

  getAllAnswerTypes() {
    this.allAnswerTypes = this._allQuestionsService.allAnswerTypes;
  }

  getAllActivePharma() {
    this._allQuestionsService.getAllActivePharma().subscribe((res) => {
      this.allActivePharma = res.body;
    });
  }

  formInit(): void {
    this.brandMessageFormGroup = this.fb.group({
      question: ['', Validators.required],
      attachmentType: ['', Validators.required],
      answerType: [null, Validators.required],
      pharmaCompanyId: [null, Validators.required],
      points: ['', Validators.required],
      comments: ['', Validators.required],
      isQuestionComment: [false, Validators.required],
      videoLink: ['']
    });
    this.optionsFormGroup = this.fb.group({
      options: this.fb.array([this.initOptions()]),
    });
  }

  initOptions() {
    return this.fb.group({
      optionName: ['', Validators.required],
      isOptionComment:[false,Validators.required]
    });
  }

  get options(): FormArray {
    return this.optionsFormGroup.get('options') as FormArray;
  }

  changeType(answertype: string){
    if(answertype == 'Text'){
      this.optionsFormGroup = this.fb.group({
        options: this.fb.array([]),
      });
    this.brandMessageFormGroup.controls['isQuestionComment'].setValue(true)
    return;
    }else if(answertype == 'Yes/No Select'){
      this.brandMessageFormGroup.controls['isQuestionComment'].setValue(false)
      this.optionsFormGroup = this.fb.group({
        options: this.fb.array([this.initOptions()]),
      });
    }
  }

  addOptions() {
    if (this.optionsFormGroup.valid || this.editFlag == true) {
      const optionControl = this.optionsFormGroup.controls['options'] as FormArray;
      optionControl.push(this.initOptions());
    } else {
      this._toastr.error('Invalid option!');
    }
  }

  removeOptions(index) {
    const optionControl = (this.optionsFormGroup.controls['options'] as FormArray);
    optionControl.removeAt(index);
  }

  onAddNewOption() {
    (this.brandMessageFormGroup.get('options') as FormArray).push(
      this.fb.control('')
    );
  }

  // removeAnOption(i){
  //   (this.brandMessageFormGroup.get('options') as FormArray).splice(i,1);
  // }

  get imageOrgif(): FormArray {
    if (
      this.brandMessageFormGroup &&
      this.brandMessageFormGroup.get('imageOrgif')
    ) {
      return this.brandMessageFormGroup.get('imageOrgif') as FormArray;
    }
  }

  get optionsControl() {
    return this.brandMessageFormGroup.get('options') as FormArray;
  } 

  removePhoto(i) {
    this.imageOrgif.removeAt(i);
  }

  onFileSelected(file): void {
    if (file.item(0).type.includes('gif') || file.item(0).type.includes('GIF')) {
      this.uploadImage = file.item(0);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.gifPreview = [{ _id: Date.now(), path: file, imagePath: e.target.result }];
      }
      reader.readAsDataURL(file.item(0));
    } else {
      this._toastr.error('Invalid format');
    }
  }

  uploadFile(event) {
    const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      if (this.imagePrieview.length < 3) {
        if (allowedExtensions.includes(element.type)) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePrieview = [...this.imagePrieview, { _id: Date.now(), path: element, imagePath: e.target.result }];
          }
          reader.readAsDataURL(element);
        }
        else
          this._toastr.warning("Only jpeg, jpg and png are allowed");
      } 
    }
  }

  // onSelectAnswerType(event) {
  //   let selected = event.value.name;
  //   if (selected == 'Text') {
  //     this.selectedAnswerType = false;
  //   } else {
  //     this.selectedAnswerType = true;
  //   }
  // }

  onAttachmentType(event) {
    console.warn(event);

    let selectedAttach = event.value;
    if (selectedAttach == 'none') {
      this.attachTypeImgGif = false;
      this.attachTypeVideo = false;
    } else if (selectedAttach == 'Gif' || selectedAttach == 'Image') {
      this.attachTypeImgGif = true;
      this.attachTypeVideo = false;
    } else {
      this.attachTypeImgGif = false;
      this.attachTypeVideo = true;
    }
  }  

  // saveQuestion(){
    
  //     if(this.brandMessageFormGroup.valid){
  //       const formData = new FormData();
  
  //       formData.append("question", this.brandMessageFormGroup.controls['question'].value);
  //       formData.append("pharmaCompanyId", this.brandMessageFormGroup.controls['pharmaCompanyId'].value);
  //       formData.append("pointAssigned", this.brandMessageFormGroup.controls['points'].value);
  //       formData.append("imageOrgif", JSON.stringify(this.imageOrGIf));
  //       formData.append("selectedType", this.brandMessageFormGroup?.controls['attachmentType'].value);
  //       formData.append("audioOrvideoLink", this.brandMessageFormGroup?.controls['videoLink'].value);
  //       formData.append("uploadedFile", JSON.stringify(this.uploadedFileArray));
  //       formData.append("isSurveyAssign", "false");
  //       formData.append("comments", this.brandMessageFormGroup?.controls['comments'].value);
  //       formData.append("isQuestionComment", this.brandMessageFormGroup?.controls['isQuestionComment'].value);
  //       formData.append("answerType",JSON.stringify({id: this.brandMessageFormGroup?.controls['answerType'].value.id,type: this.brandMessageFormGroup?.controls['answerType'].value.name}));
  //       formData.append("options", JSON.stringify(this.optionsArray));
  
  //       // this.editFlag ? this.updateQuestion(formData, this.questionId) : this.createQuestion(formData);

  //       if (this.brandMessageFormGroup.controls['attachmentType'].value == 'Image') {
  //         if (this.imagePrieview.length == 0) {
  //           this._toastr.warning('At least one Image Required');
  //           return 0;
  //         }       
  
  //         let imageIds = []
  //         if (this.editFlag)
  //           imageIds = this.imageOrGIf.map(res => res._id)
  //         console.log(imageIds);
  //         this.imagePrieview.forEach(res => {
  //           if (imageIds.includes(res._id)) {
  //             delete res.imagePath
  //             this.uploadedFileArray.push(res)
  //           }
  //           else
  //           this.imageOrGIf.push(res.path)
  //         })
  
  //         /*removing unwanted ids from delete array  */
  //         // this.deleteImages.forEach((res, i) => {
  //         //   if (!imageIds.includes(res))
  //         //     this.deleteImages.splice(i, 1)
  //         // })
  //       }
  
  //       if (this.brandMessageFormGroup.controls['attachmentType'].value == 'Video') {
  //         if (this.brandMessageFormGroup.controls['videoLink'].value == '') {
  //           this._toastr.warning('Youtube video url required');
  //           return 0;
  //         }
  //       }

  //       if (this.brandMessageFormGroup.controls['answerType'].value.type == 'Multi-select' || this.brandMessageFormGroup.controls['answerType'].value.type == 'Text'  || this.brandMessageFormGroup.controls['answerType'].value.type == 'Single-select' || this.brandMessageFormGroup.controls['answerType'].value.type == 'Yes/No Select' && this.optionsFormGroup.valid) {
  //         question.options = this.optionsFromGroup.controls.options.value;
  //         console.log(question);
  
  //         if (this.optionsFromGroup.value.options.length > 1 || this.surveyFormGroup.controls.answerType.value.type == 'Text') {
  //           var sendBody = new FormData();
  //           for (var key in question) {
  //             if (key == 'answerType' || key == 'options' || key == 'uploadedFile' || key == 'surveyId')
  //               sendBody.append(key, JSON.stringify(question[key]));
  //             else if (key == 'imageOrgif') {
  //               if (question.selectedType == 'Gif')
  //                 sendBody.append('imageOrgif', this.uploadImageName)
  //               else if (question.selectedType == 'Image') {
  //                 for (let i = 0; i < question.imageOrgif.length; i++) {
  //                   sendBody.append(`imageOrgif`, question.imageOrgif[i])
  //                 }
  //               }
  //             }
  //             else {
  //               debugger;
  //               sendBody.append(key, question[key]);
  //             }
  //           }
  
  //           this.editFlag ? this.updateQuestion(sendBody, this.questionId) : this.createQuestion(sendBody)
  //           debugger;
  //         }
  //       } else {
  //         console.log(this.surveyFormGroup.value);
  //         debugger;
  
  //         this._toastSevice.smallAlert('Inavlid Options', "error");
  //       }  
  
      
  //   }   
    
  // }  

  saveQuestion() {
    console.log(this.brandMessageFormGroup.controls);

    if (this.brandMessageFormGroup.valid) {
      let question = {
        question: this.brandMessageFormGroup.controls['question'].value,
        pharmaCompanyId:
          this.brandMessageFormGroup.controls['pharmaCompanyId'].value,
          pointAssigned: this.brandMessageFormGroup.controls['points'].value,
        imageOrgif: '' || [],
        selectedType:
        this.brandMessageFormGroup?.controls['attachmentType'].value,
        audioOrvideoLink: this.brandMessageFormGroup.controls['videoLink'].value,
        uploadedFile: [],
        isSurveyAssign: false,
        comments: this.brandMessageFormGroup.controls['comments'].value,
        isQuestionComment:
          this.brandMessageFormGroup.controls['isQuestionComment'].value,
        answerType: {
          id: this.brandMessageFormGroup.controls['answerType'].value.id,
          type: this.brandMessageFormGroup.controls['answerType'].value.type
        },
        options: [],
      };

      if (this.brandMessageFormGroup.controls['attachmentType'].value == 'Image') {
        if (this.imagePrieview.length == 0) {
          this._toastr.warning('At least one Image Required');
          return 0;
        }       

        let imageIds = []
        if (this.editFlag)
          imageIds = this.imageOrGIf.map(res => res._id)
        console.log(imageIds);
        this.imagePrieview.forEach(res => {
          if (imageIds.includes(res._id)) {
            // delete res.imagePath;
            question.uploadedFile.push(res)
          }
          else
            question.imageOrgif.push(res.path)
        })       
      }

      if (this.brandMessageFormGroup.controls['attachmentType'].value == 'Video') {
        if (this.brandMessageFormGroup.controls['videoLink'].value == '') {
          this._toastr.warning('Youtube video url required');
          return 0;
        }
      }     

      if (this.brandMessageFormGroup.controls['answerType'].value.type == 'Multi-select' || this.brandMessageFormGroup.controls['answerType'].value.type == 'Text'  || this.brandMessageFormGroup.controls['answerType'].value.type == 'Single-select' || this.brandMessageFormGroup.controls['answerType'].value.type == 'Yes/No Select' && this.optionsFormGroup.valid) {
      question.options = this.optionsFormGroup.controls['options'].value;
        console.log(question);

        if (this.optionsFormGroup.value.options.length > 1 || this.brandMessageFormGroup.controls['answerType'].value.type == 'Text') {
          var sendBody = new FormData();
          for (var key in question) {
            if (key == 'answerType' || key == 'options' || key == 'uploadedFile' )
              sendBody.append(key, JSON.stringify(question[key]));
            else if (key == 'imageOrgif') {
              if (question.selectedType == 'Gif')
                sendBody.append('imageOrgif', this.uploadImage);
                 if (question.selectedType == 'Image') {
                for (let i = 0; i < question.imageOrgif.length; i++) {
                  sendBody.append('imageOrgif', question.imageOrgif[i])
                }
              }
            }
            else {
              sendBody.append(key, question[key]);
            }
          }

          this.editFlag ? this.updateQuestion(sendBody, this.questionId) : this.createQuestion(sendBody);
        }
    }
  }

}

  /* -----------creating new question------- */

  createQuestion(sendBody): void {
    this._allQuestionsService.createQuestion(sendBody).subscribe(
      (res) => {
        this._toastr.success("Question created successfully!");
        this.dialogRef.close();
      },
      (err) => {
        this._toastr.error("Error while creating the question!");
      }
    );
  }

  /* -----------update existing question------- */

  public updateQuestion(sendBody, questionId): void {
    this._allQuestionsService.updateQuestion(sendBody, questionId).subscribe(
      (res) => {
        this._toastr.success("Question updated successfully!");        
        this.dialogRef.close();
        this._allQuestionsService.getAllQuestions();
      },
      (err) => {
        this._toastr.error("Error while updating the question!");
      }
    );
  }
  
  editQuestion(){

    console.log(this.editData); //getting the row values    

    if(this.editData){
      
      this.questionId = this.editData._id;
      this.editFlag = true;

      this.brandMessageFormGroup.patchValue(this.editData);


      this.brandMessageFormGroup.controls['points'].setValue(this.editData.pointAssigned);
  
      this.brandMessageFormGroup.get('answerType').setValue(this.editData.answerType.id);
      this.brandMessageFormGroup.get('attachmentType').setValue(this.editData.selectedType);
      this.brandMessageFormGroup.get('videoLink').setValue(this.editData.audioOrvideoLink);
      // this.brandMessageFormGroup.get('imageOrgif').setValue(this.editData.imageOrgif);

      if (this.editData.selectedType == "Gif") {
        this.editData.imageOrgif.forEach(res => {
          let data2 = Object.assign({}, res);
          data2.imagePath = data2.path;
          this.gifPreview = [data2];
        });
      }
  
      if (this.editData.selectedType == "Image") {
        this.editData.imageOrgif.forEach(res => {
          let data2 = Object.assign({}, res);
          data2.imagePath = data2.path;
          this.imagePrieview.push(data2);
        });
      }

      this.options.clear();

      for (let x = 0; x < this.editData.options.length; x++) {
        this.addOptions();
      }
      this.optionsFormGroup.patchValue(this.editData);
    }
  }
}
