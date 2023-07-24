<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Http\Resources\ImageResource;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function index(){
        return response()->json(ImageResource::collection(Image::all())) ;
    }

    public function uplaods(Request $request){
        if($request->has('image')){
            $image = $request->file('image');
           $imageName = time().'.'.$image->getClientOriginalExtension();
           $image->move('images/',$imageName);
           Image::create(['image'=>$imageName]);
           return response()->json(['message'=>'Image Uploaded Successfully']);
        }
        return response()->json('please try again');
    }

    public function delete($id){
        $image = Image::find($id);
        //dd($image);
        $image->delete();
        return response()->json(['message' => 'Image delete successfully']);
    }
}
