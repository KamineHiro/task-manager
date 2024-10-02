import os
import subprocess

# 検索するディレクトリ
directory = "/Users/akaminehiroki/2年/Stulab2/"
extensions = ('.c', '.java', '.py')

# 合計用変数
total_words = 0
total_lines = 0
total_bytes = 0

# ファイルを検索して、wc コマンドを実行
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(extensions):
            filepath = os.path.join(root, file)
            # wc コマンドでワードカウント、行数、バイト数を実行
            result = subprocess.run(['wc', filepath], capture_output=True, text=True)
            print(result.stdout.strip())
            
            # 結果をスペースで分割し、それぞれの値を取得
            parts = result.stdout.split()
            total_lines += int(parts[0])
            total_words += int(parts[1])
            total_bytes += int(parts[2])

# 最後に合計を表示
print(f"{total_lines}\t{total_words}\t{total_bytes} total")

