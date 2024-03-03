<?php

namespace Mocking\Controllers;

class HomeController extends Controller {
    public function getData() {
        $path = base_path()."/Mocking/Json/get_list.json";
        $json = json_decode(file_get_contents($path), true);
        return response()->json($json);
    }

    public function postData() {
        $path = base_path()."/Mocking/Json/post_bought_stocks.json";
        $json = json_decode(file_get_contents($path), true);
        return response()->json($json);
    }
}