import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import gzip
import matplotlib

# 下载中文支持字体。后面画图需要
zhfont = matplotlib.font_manager.FontProperties(fname='./data/SimHei-windows.ttf')
# 解析解压得到四个训练的数据
def read_data():
    files = [
        'train-labels-idx1-ubyte.gz', 'train-images-idx3-ubyte.gz',
        't10k-labels-idx1-ubyte.gz', 't10k-images-idx3-ubyte.gz'
    ]
    # 我在当前的目录下创建文件夹，里面放入上面的四个压缩文件
    current = './data'
    paths = []
    for i in range(len(files)):
        paths.append('./data/' + files[i])

    with gzip.open(paths[0], 'rb') as lbpath:
        y_train = np.frombuffer(lbpath.read(), np.uint8, offset=8)

    with gzip.open(paths[1], 'rb') as imgpath:
        x_train = np.frombuffer(
            imgpath.read(), np.uint8, offset=16).reshape(len(y_train), 28, 28,1)

    with gzip.open(paths[2], 'rb') as lbpath:
        y_test = np.frombuffer(lbpath.read(), np.uint8, offset=8)

    with gzip.open(paths[3], 'rb') as imgpath:
        x_test = np.frombuffer(
            imgpath.read(), np.uint8, offset=16).reshape(len(y_test), 28, 28,1)

    return (x_train, y_train), (x_test, y_test)
# 分别得到训练数据集和测试数据集
(train_images, train_labels), (test_images, test_labels) = read_data()
class_names = ['短袖圆领T恤', '裤子', '套衫', '连衣裙', '外套',
              '凉鞋', '衬衫', '运动鞋','包', '短靴']
# 创建一个新图形
plt.figure()
# 显示一张图片在二维的数据上 train_images[0] 第一张图
plt.imshow(train_images[0])
# 在图中添加颜色条
plt.colorbar()
# 是否显示网格线条,True: 显示，False: 不显示
plt.grid(False)
# 训练图像缩放255，在0 和 1 的范围
train_images = train_images / 255.0
# 测试图像缩放
test_images = test_images / 255.0
# 建立模型
def build_model():
    model=tf.keras.models.Sequential()
    model.add(tf.keras.layers.Conv2D(input_shape=(28,28,1),filters=32, kernel_size=5, strides=1, padding='same'))
    #输出28，28，32   same填充0  计算方法(28-4+2*2)+1
    model.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2, padding='same'))#14*14*32
    model.add(tf.keras.layers.Conv2D(filters=64, kernel_size=3, strides=1, padding='same'))#14*14*64
    model.add(tf.keras.layers.MaxPool2D(pool_size=2, strides=2, padding='same'))#7*7*64
    model.add(tf.keras.layers.Flatten())
    model.add(tf.keras.layers.Dense(256, activation=tf.nn.relu))
    model.add(tf.keras.layers.Dense(10, activation=tf.nn.softmax))
    return model
# 模型编译、评估及保存
model = build_model()
model.compile(
    optimizer=tf.compat.v1.train.AdamOptimizer(0.0001),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy'])
history=model.fit(train_images, train_labels, validation_split=0.33,epochs=20)# 训练模型
test_loss, test_acc = model.evaluate(test_images, test_labels)# 评估模型（主要是测试数据集）
model.save('./model/my_model.h5')
print('测试损失：%f 测试准确率: %f' % (test_loss, test_acc))
model.summary()
predictions = model.predict(test_images)
# 提取25个数据集，进行预测判断是否正确
index = np.random.randint(0,1000,size=25)
for i in (index):
    pre = class_names[np.argmax(predictions[i])]
    tar = class_names[test_labels[i]]
    print("预测：%s   实际：%s" % (pre, tar))
# 保存画布的图形，宽度为 10 ， 长度为10
plt.figure(figsize=(10, 10))
# 预测 25 张图像是否准确，不准确为红色。准确为蓝色
j=0
for i in (index):
    # 创建分布 5 * 5 个图形
    plt.subplot(5, 5, j + 1)
    plt.xticks([])
    plt.yticks([])
    plt.grid(False)
    j=j+1
    # 显示照片，以cm 为单位。
    plt.imshow(test_images[i], cmap=plt.cm.binary)
    # 预测的图片是否正确，黑色底表示预测正确，红色底表示预测失败
    predicted_label = np.argmax(predictions[i])
    true_label = test_labels[i]
    if predicted_label == true_label:
        color = 'black'
    else:
        color = 'red'
    plt.xlabel("{} ({})".format(class_names[predicted_label],
                                class_names[true_label]),
               color=color,
               fontproperties=zhfont)
plt.show()
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title("model loss")
plt.ylabel("loss")
plt.xlabel("epoch")
plt.legend(["train-loss","test-loss"],loc="upper left")
plt.show()
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title("model accuracy")
plt.ylabel("accuracy")
plt.xlabel("epoch")
plt.legend(["train-accuracy","test-accuracy"],loc="upper left")
plt.show()
Model: "sequential"
# _________________________________________________________________
# Layer (type)                 Output Shape              Param #
# =================================================================
# conv2d (Conv2D)              (None, 28, 28, 32)        832
# _________________________________________________________________
# max_pooling2d (MaxPooling2D) (None, 14, 14, 32)        0
# _________________________________________________________________
# conv2d_1 (Conv2D)            (None, 14, 14, 64)        18496
# _________________________________________________________________
# max_pooling2d_1 (MaxPooling2 (None, 7, 7, 64)          0
# _________________________________________________________________
# flatten (Flatten)            (None, 3136)              0
# _________________________________________________________________
# dense (Dense)                (None, 256)               803072
# _________________________________________________________________
# dense_1 (Dense)              (None, 10)                2570
# =================================================================
# Total params: 824,970
# Trainable params: 824,970
# Non-trainable params: 0
# _________________________________________________________________
