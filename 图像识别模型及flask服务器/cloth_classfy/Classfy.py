import base64
from flask_cors import CORS
from flask import request, Flask, json
from PIL import Image
import numpy as np
import  tensorflow.keras.models as models
app = Flask(__name__)
CORS(app,supports_credentials=True)
@app.route('/classfy/',methods=['POST','GET'])
def classfy():
    name=''
    if(request.method=="POST"):
        data=request.files.get('file')
        data.save('a.jpg')
        with open('a.jpg', 'rb') as f1:
            base64_str = base64.b64encode(f1.read())  # base64类型
        print(data,flush=True)
        class_names = ['短袖圆领T恤', '裤子', '套衫', '连衣裙', '外套','凉鞋', '衬衫', '运动鞋', '包', '短靴']
        image_path = "a.jpg"
        im = Image.open(image_path)
        im = im.convert('L')# 将RGB彩色图像转为灰度图像 0-255   0 最黑   255 最白
        im = im.resize((28, 28), Image.ANTIALIAS)# 将图片调整为为28*28大小的图像 Image.ANTIALIAS高质量调整，清晰度更高点  Image.NEAREST低质量调整
        image_list = []
        for x in range(28):
            scanline_list = []
            for y in range(28):
                pixel = im.getpixel((y, x))# 获得这张图片每个像素点的值
                pixel = 255 - pixel
                scanline_list.append(pixel)
            image_list.append(scanline_list)
        arr1 = np.array(255 - np.array(im)).reshape((1, 28, 28, 1))# 转成模型能够接受的数据类型
        model = models.load_model('./model/my_model.h5')
        predictions = model.predict(arr1 / 255.0)
        name=class_names[np.argmax(predictions[0])]
        print(name, flush=True)
    return {'class':name}
if __name__ == '__main__':
    app.run(debug=True,port=8088)

